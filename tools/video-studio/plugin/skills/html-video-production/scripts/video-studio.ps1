[CmdletBinding()]
param(
    [ValidateSet('Menu','Init','Info','Trim','Concat','Resize','Audio','AudioBook','TtsPrompt','RepurposeAudiobook','Subtitles','Watermark','Export','CreateFromImages')]
    [string]$Command = 'Menu',
    [string]$Project = (Join-Path (Get-Location) 'VideoProject'),
    [Alias('Input')]
    [string]$MediaInput,
    [string]$Output,
    [string]$Start = '00:00:00',
    [string]$End,
    [string]$Preset = 'youtube1080p',
    [string]$Audio,
    [string]$SubtitleFile,
    [string]$WatermarkFile,
    [string]$TextFile,
    [string]$Language = 'English',
    [string]$Accent = 'United States',
    [string]$Tone = 'warm, clear, natural audiobook narration',
    [string]$Voice = 'Charon',
    [string]$BackgroundFile,
    [string]$HookFile,
    [int]$ReelSeconds = 35,
    [int]$Fps = 30,
    [int]$SecondsPerImage = 3,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Header([string]$Text) {
    Write-Host "`n=== $Text ===" -ForegroundColor Cyan
}

function Require-Tool([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "$Name was not found. Install FFmpeg first: winget install Gyan.FFmpeg.Shared"
    }
}

function Ensure-Project {
    foreach ($dir in @($Project, (Join-Path $Project 'input'), (Join-Path $Project 'output'), (Join-Path $Project 'temp'), (Join-Path $Project 'assets'))) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
}

function Resolve-Input([string]$Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) { throw 'Input path is required.' }
    $resolved = Resolve-Path -LiteralPath $Path -ErrorAction Stop
    return $resolved.Path
}

function New-OutputPath([string]$Name = 'render') {
    Ensure-Project
    if ($Output) { return [IO.Path]::GetFullPath($Output) }
    return Join-Path $Project ('output/{0}_{1}_{2}.mp4' -f $Name, (Get-Date -Format 'yyyyMMdd_HHmmssfff'), ([guid]::NewGuid().ToString('N').Substring(0,8)))
}

function Invoke-FFmpeg([string[]]$Arguments) {
    Write-Host ('ffmpeg ' + ($Arguments -join ' ')) -ForegroundColor DarkGray
    $destination = $Arguments[-1]
    $parent = Split-Path -Parent $destination
    if ($parent) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
    foreach ($index in 0..($Arguments.Count - 2)) {
        if ($Arguments[$index] -eq '-i' -and (Test-Path -LiteralPath $Arguments[$index + 1] -PathType Leaf)) {
            if ([IO.Path]::GetFullPath($Arguments[$index + 1]) -eq [IO.Path]::GetFullPath($destination)) { throw 'Output must differ from input.' }
        }
    }
    if ((Test-Path -LiteralPath $destination) -and -not $Force) { throw 'Output already exists. Use -Force to replace it.' }
    $policy = if ($Force) { '-y' } else { '-n' }
    & ffmpeg $policy @Arguments
    if ($LASTEXITCODE -ne 0) { throw "FFmpeg failed with exit code $LASTEXITCODE." }
}

function Get-VideoInfo([string]$Path) {
    $json = & ffprobe -v quiet -print_format json -show_format -show_streams -- "$Path"
    if ($LASTEXITCODE -ne 0) { throw 'Unable to read media information.' }
    return ($json | ConvertFrom-Json)
}

function Initialize-Project {
    Ensure-Project
    $readme = Join-Path $Project 'README.txt'
    if (-not (Test-Path $readme)) {
        @"
VideoProject
============
input  - source videos, images, audio and subtitles
assets - logos, fonts and supporting files
temp   - intermediate files
output - finished renders

Keep source files backed up. The script never overwrites an existing output unless you explicitly provide that path.
"@ | Set-Content -Encoding UTF8 $readme
    }
    Write-Host "Project ready: $Project" -ForegroundColor Green
}

function Show-Info {
    $file = Resolve-Input $MediaInput
    $info = Get-VideoInfo $file
    $video = @($info.streams | Where-Object { $_.codec_type -eq 'video' }) | Select-Object -First 1
    $audio = $info.streams | Where-Object { $_.codec_type -eq 'audio' } | Select-Object -First 1
    [pscustomobject]@{
        File       = $file
        Duration   = $info.format.duration
        VideoCodec = if ($video) { $video.codec_name } else { 'None' }
        Resolution = if ($video) { "$($video.width)x$($video.height)" } else { 'Audio only' }
        FPS        = if ($video) { $video.r_frame_rate } else { 'N/A' }
        AudioCodec = if ($audio) { $audio.codec_name } else { 'None' }
        SizeMB     = [math]::Round((Get-Item $file).Length / 1MB, 2)
    } | Format-List
}

function Trim-Video {
    $file = Resolve-Input $MediaInput
    $out = New-OutputPath 'trim'
    $ffmpegArgs = @('-hide_banner','-ss',$Start,'-i',$file)
    if ($End) {
        $seconds = ([TimeSpan]::Parse($End) - [TimeSpan]::Parse($Start)).TotalSeconds
        if ($seconds -le 0) { throw 'End must be later than Start.' }
        $ffmpegArgs += @('-t', $seconds.ToString([Globalization.CultureInfo]::InvariantCulture))
    }
    $ffmpegArgs += @('-map','0:v:0?','-map','0:a:0?','-c:v','libx264','-preset','medium','-crf','18','-c:a','aac','-b:a','192k','-movflags','+faststart',$out)
    Invoke-FFmpeg $ffmpegArgs
    Write-Host "Created: $out" -ForegroundColor Green
}

function Concat-Videos {
    Ensure-Project
    $files = @(Get-ChildItem -LiteralPath (Join-Path $Project 'input') -File | Where-Object { $_.Extension -match '\.(mp4|mov|mkv|webm)$' } | Sort-Object Name)
    if ($files.Count -lt 2) { throw "Put at least two video files in '$Project\input'." }
    $list = Join-Path $Project 'temp/concat.txt'
    $files | ForEach-Object { "file '$($_.FullName.Replace("'", "'\\''"))'" } | ForEach-Object -Begin { $listLines = @() } -Process { $listLines += $_ } -End { [IO.File]::WriteAllLines($list, [string[]]$listLines, [Text.UTF8Encoding]::new($false)) }
    $out = New-OutputPath 'concat'
    Invoke-FFmpeg @('-hide_banner','-f','concat','-safe','0','-i',$list,'-c:v','libx264','-preset','medium','-crf','18','-c:a','aac','-b:a','192k','-movflags','+faststart',$out)
    Write-Host "Joined $($files.Count) clips: $out" -ForegroundColor Green
}

function Resize-Video {
    $file = Resolve-Input $MediaInput
    $out = New-OutputPath $Preset
    $scale = switch ($Preset.ToLowerInvariant()) {
        'youtube1080p' { 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2' }
        'youtube4k'    { 'scale=3840:2160:force_original_aspect_ratio=decrease,pad=3840:2160:(ow-iw)/2:(oh-ih)/2' }
        'vertical1080' { 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2' }
        'square1080'   { 'scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2' }
        default        { throw 'Preset must be youtube1080p, youtube4k, vertical1080, or square1080.' }
    }
    Invoke-FFmpeg @('-hide_banner','-i',$file,'-vf',$scale,'-r',$Fps,'-c:v','libx264','-preset','medium','-crf','18','-c:a','aac','-b:a','192k','-movflags','+faststart',$out)
    Write-Host "Created: $out" -ForegroundColor Green
}

function Add-Audio {
    $video = Resolve-Input $MediaInput
    $music = Resolve-Input $Audio
    $out = New-OutputPath 'audio'
    $info = Get-VideoInfo $video
    $hasAudio = @($info.streams | Where-Object { $_.codec_type -eq 'audio' }).Count -gt 0
    $mix = if ($hasAudio) { '[1:a]volume=0.18[music];[0:a][music]amix=inputs=2:duration=first:dropout_transition=2[a]' } else { '[1:a]volume=0.18[a]' }
    Invoke-FFmpeg @('-hide_banner','-i',$video,'-stream_loop','-1','-i',$music,'-filter_complex',$mix,'-map','0:v:0','-map','[a]','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',$out)
    Write-Host "Mixed audio: $out" -ForegroundColor Green
}

function Create-Audiobook {
    Ensure-Project
    $dir = if ($MediaInput) { Resolve-Input $MediaInput } else { Join-Path $Project 'input' }
    if (-not (Test-Path -LiteralPath $dir -PathType Container)) { throw "Audio folder not found: $dir" }
    $tracks = @(Get-ChildItem -LiteralPath $dir -File | Where-Object { $_.Extension -match '\.(mp3|m4a|aac|wav|flac|ogg)$' } | Sort-Object Name)
    if ($tracks.Count -eq 0) { throw "No audiobook audio files found in $dir" }
    $list = Join-Path $Project 'temp/audiobook.txt'
    $tracks | ForEach-Object { "file '$($_.FullName.Replace("'", "'\\''"))'" } | ForEach-Object -Begin { $listLines = @() } -Process { $listLines += $_ } -End { [IO.File]::WriteAllLines($list, [string[]]$listLines, [Text.UTF8Encoding]::new($false)) }
    $out = if ($Output) { [IO.Path]::GetFullPath($Output) } else { Join-Path $Project ('output/audiobook_{0}.m4b' -f (Get-Date -Format 'yyyyMMdd_HHmmss')) }
    Invoke-FFmpeg @('-hide_banner','-f','concat','-safe','0','-i',$list,'-af','loudnorm=I=-16:TP=-1.5:LRA=11','-c:a','aac','-b:a','128k','-movflags','+faststart','-f','ipod',$out)
    Write-Host "Created audiobook from $($tracks.Count) files: $out" -ForegroundColor Green
}

function New-TtsPrompt {
    if ([string]::IsNullOrWhiteSpace($TextFile)) { throw 'TextFile is required. Provide a .txt or .md manuscript.' }
    $textPath = Resolve-Input $TextFile
    $spokenText = Get-Content -LiteralPath $textPath -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($spokenText)) { throw 'The text file is empty.' }
    $out = if ($Output) { [IO.Path]::GetFullPath($Output) } else { [IO.Path]::ChangeExtension($textPath, '.tts-prompt.txt') }
    if ([IO.Path]::GetFullPath($textPath) -eq $out) { throw 'Output must differ from manuscript.' }
    if ((Test-Path -LiteralPath $out) -and -not $Force) { throw 'Output already exists. Use -Force to replace it.' }
    $prompt = @"
Voice: $Voice

Speak in $Language with a standard $Accent accent. Use a $Tone delivery. Maintain consistent pronunciation, natural breathing, and clear diction. Do not add, remove, summarize, or translate any words. This is audiobook narration; let punctuation create comfortable pauses:
$spokenText
"@
    [IO.File]::WriteAllText($out, $prompt, [Text.UTF8Encoding]::new($false))
    Write-Host "Created TTS prompt: $out" -ForegroundColor Green
}

function ConvertTo-DrawText([string]$Text) {
    return $Text.Replace('\','\\').Replace(':','\:').Replace("'", "\\'").Replace(',','\,')
}

function Repurpose-Audiobook {
    Ensure-Project
    $dir = if ($MediaInput) { Resolve-Input $MediaInput } else { Join-Path $Project 'input' }
    if (-not (Test-Path -LiteralPath $dir -PathType Container)) { throw "Audio folder not found: $dir" }
    if ($ReelSeconds -lt 5 -or $ReelSeconds -gt 180) { throw 'ReelSeconds must be between 5 and 180.' }
    $tracks = @(Get-ChildItem -LiteralPath $dir -File | Where-Object { $_.Extension -match '\.(mp3|m4a|aac|wav|flac|ogg)$' } | Sort-Object Name)
    if ($tracks.Count -eq 0) { throw "No audiobook audio files found in $dir" }
    $bg = $null
    if ($BackgroundFile) { $bg = Resolve-Input $BackgroundFile }
    $hooks = @()
    if ($HookFile) { $hooks = @(Get-Content -LiteralPath (Resolve-Input $HookFile) -Encoding UTF8) }
    $outDir = Join-Path $Project 'output/reels'
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
    $font = @('C:\Windows\Fonts\arial.ttf','C:\Windows\Fonts\segoeui.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf') | Where-Object { Test-Path $_ } | Select-Object -First 1
    $i = 0
    foreach ($track in $tracks) {
        $i++
        $info = Get-VideoInfo $track.FullName
        $clipSeconds = [math]::Min($ReelSeconds, [double]::Parse([string]$info.format.duration, [Globalization.CultureInfo]::InvariantCulture))
        $clipTime = $clipSeconds.ToString([Globalization.CultureInfo]::InvariantCulture)
        $base = [IO.Path]::GetFileNameWithoutExtension($track.Name)
        $title = ConvertTo-DrawText $base
        $hook = if ($hooks.Count -ge $i) { ConvertTo-DrawText $hooks[$i-1] } else { '' }
        $out = Join-Path $outDir ('reel_{0:D3}_{1}.mp4' -f $i, ($base -replace '[^a-zA-Z0-9_-]','_'))
        $draw = @()
        if ($font) {
            $fontEsc = $font.Replace('\','/').Replace(':','\:')
            $draw += "drawtext=fontfile='$fontEsc':text='$title':fontcolor=white:fontsize=42:box=1:boxcolor=black@0.45:boxborderw=18:x=(w-text_w)/2:y=170"
            if ($hook) { $draw += "drawtext=fontfile='$fontEsc':text='$hook':fontcolor=white:fontsize=30:box=1:boxcolor=black@0.45:boxborderw=14:x=(w-text_w)/2:y=270" }
        }
        $draw += 'format=yuv420p'
        $videoFilter = "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,$($draw -join ',')"
        if ($bg) {
            $bgArgs = if ([IO.Path]::GetExtension($bg).ToLowerInvariant() -match '\.(jpg|jpeg|png|webp)$') { @('-loop','1','-i',$bg) } else { @('-stream_loop','-1','-i',$bg) }
            $ffmpegArgs = @('-hide_banner') + $bgArgs + @('-i',$track.FullName,'-filter_complex',"[0:v]$videoFilter[base];[1:a]showwaves=s=980x180:mode=line:colors=0xFFFFFF@0.9,format=rgba[wave];[base][wave]overlay=50:1500:format=auto[reel]",'-map','[reel]','-map','1:a','-t',$clipTime,'-shortest','-r','30','-c:v','libx264','-preset','medium','-crf','20','-c:a','aac','-b:a','160k','-movflags','+faststart',$out)
        } else {
            $ffmpegArgs = @('-hide_banner','-f','lavfi','-i','color=c=0x111827:s=1080x1920:r=30','-i',$track.FullName,'-filter_complex',"[0:v]$videoFilter[base];[1:a]showwaves=s=980x180:mode=line:colors=0xFFFFFF@0.9,format=rgba[wave];[base][wave]overlay=50:1500:format=auto[reel]",'-map','[reel]','-map','1:a','-t',$clipTime,'-shortest','-r','30','-c:v','libx264','-preset','medium','-crf','20','-c:a','aac','-b:a','160k','-movflags','+faststart',$out)
        }
        Invoke-FFmpeg $ffmpegArgs
        Write-Host "Created Reel $i/$($tracks.Count): $out" -ForegroundColor Green
    }
}

function Add-Subtitles {
    $video = Resolve-Input $MediaInput
    $subs = Resolve-Input $SubtitleFile
    $out = New-OutputPath 'subtitles'
    $escaped = $subs.Replace('\','/').Replace(':','\:')
    Invoke-FFmpeg @('-hide_banner','-i',$video,'-vf',"subtitles='$escaped':force_style='FontName=Arial,FontSize=22,Outline=2,Shadow=1,MarginV=45'",'-c:v','libx264','-preset','medium','-crf','18','-c:a','copy','-movflags','+faststart',$out)
    Write-Host "Burned subtitles: $out" -ForegroundColor Green
}

function Add-Watermark {
    $video = Resolve-Input $MediaInput
    $logo = Resolve-Input $WatermarkFile
    $out = New-OutputPath 'watermark'
    Invoke-FFmpeg @('-hide_banner','-i',$video,'-i',$logo,'-filter_complex','[1:v]scale=240:-1[logo];[0:v][logo]overlay=W-w-30:H-h-30:format=auto[marked]','-map','[marked]','-map','0:a?','-c:v','libx264','-preset','medium','-crf','18','-c:a','copy','-movflags','+faststart',$out)
    Write-Host "Added watermark: $out" -ForegroundColor Green
}

function Create-FromImages {
    $dir = if ($MediaInput) { Resolve-Input $MediaInput } else { Join-Path $Project 'input' }
    $images = @(Get-ChildItem -LiteralPath $dir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|webp)$' } | Sort-Object Name)
    if ($images.Count -eq 0) { throw "No images found in $dir" }
    $out = New-OutputPath 'slideshow'
    $list = Join-Path $Project 'temp/images.txt'
    $lines = foreach ($image in $images) { "file '$($image.FullName.Replace("'", "'\\''"))'"; "duration $SecondsPerImage" }
    $lines += "file '$($images[-1].FullName.Replace("'", "'\\''"))'"
    $lines | ForEach-Object -Begin { $listLines = @() } -Process { $listLines += $_ } -End { [IO.File]::WriteAllLines($list, [string[]]$listLines, [Text.UTF8Encoding]::new($false)) }
    Invoke-FFmpeg @('-hide_banner','-f','concat','-safe','0','-i',$list,'-vf',"scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",'-r',$Fps,'-c:v','libx264','-preset','medium','-crf','18','-movflags','+faststart',$out)
    Write-Host "Created slideshow: $out" -ForegroundColor Green
}

function Show-Menu {
    Ensure-Project
    while ($true) {
        Write-Header 'Video Studio'
        Write-Host "Project: $Project"
        Write-Host '1  Initialize project folders'
        Write-Host '2  Show media info'
        Write-Host '3  Trim a video'
        Write-Host '4  Join videos in input folder'
        Write-Host '5  Resize/reframe video'
        Write-Host '6  Mix background audio'
        Write-Host '7  Assemble audiobook chapters'
        Write-Host '8  Create a TTS prompt from a manuscript'
        Write-Host '9  Create Reels from audiobook chapters'
        Write-Host '10 Burn SRT subtitles'
        Write-Host '11 Add watermark/logo'
        Write-Host '12 Create slideshow from images'
        Write-Host '0  Exit'
        $choice = Read-Host 'Choose an action'
        try {
            switch ($choice) {
                '1' { Initialize-Project }
                '2' { $script:MediaInput = Read-Host 'Video path'; Show-Info }
                '3' { $script:MediaInput = Read-Host 'Video path'; $script:Start = Read-Host 'Start time (HH:MM:SS)'; $script:End = Read-Host 'End time (blank = end)'; Trim-Video }
                '4' { Concat-Videos }
                '5' { $script:MediaInput = Read-Host 'Video path'; $script:Preset = Read-Host 'Preset (youtube1080p/youtube4k/vertical1080/square1080)'; Resize-Video }
                '6' { $script:MediaInput = Read-Host 'Video path'; $script:Audio = Read-Host 'Music/audio path'; Add-Audio }
                '7' { $script:MediaInput = Read-Host 'Audiobook folder (blank = project input)'; Create-Audiobook }
                '8' { $script:TextFile = Read-Host 'Manuscript .txt/.md path'; $script:Language = Read-Host 'Spoken language'; $script:Accent = Read-Host 'Accent'; $script:Tone = Read-Host 'Tone/delivery'; New-TtsPrompt }
                '9' { $script:MediaInput = Read-Host 'Audiobook folder'; $script:BackgroundFile = Read-Host 'Background image/video (blank = plain background)'; $script:HookFile = Read-Host 'Hooks text file (blank = no hooks)'; Repurpose-Audiobook }
                '10' { $script:MediaInput = Read-Host 'Video path'; $script:SubtitleFile = Read-Host 'SRT subtitle path'; Add-Subtitles }
                '11' { $script:MediaInput = Read-Host 'Video path'; $script:WatermarkFile = Read-Host 'PNG logo path'; Add-Watermark }
                '12' { $script:MediaInput = Read-Host 'Image folder (blank = project input)'; Create-FromImages }
                '0' { return }
                default { Write-Warning 'Unknown choice.' }
            }
        } catch { Write-Warning $_.Exception.Message }
        Read-Host 'Press Enter to continue' | Out-Null
    }
}

Require-Tool 'ffmpeg'
Require-Tool 'ffprobe'

switch ($Command) {
    'Menu'             { Show-Menu }
    'Init'             { Initialize-Project }
    'Info'             { Show-Info }
    'Trim'             { Trim-Video }
    'Concat'           { Concat-Videos }
    'Resize'           { Resize-Video }
    'Audio'            { Add-Audio }
    'AudioBook'        { Create-Audiobook }
    'TtsPrompt'        { New-TtsPrompt }
    'RepurposeAudiobook' { Repurpose-Audiobook }
    'Subtitles'        { Add-Subtitles }
    'Watermark'        { Add-Watermark }
    'Export'           { Resize-Video }
    'CreateFromImages' { Create-FromImages }
}
