// Read-only source CTA census. Not an end-to-end browser verification.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dir=join(root,'app');
const files=(d)=>readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(d,x.name)):x.name.endsWith('.tsx')?[join(d,x.name)]:[]);
const rows=[];
for(const filename of files(dir)){
 const s=readFileSync(filename,'utf8');
 const patterns=[
  [/router\.push\(([^\n;]+?)\)/g,'internal navigation'],
  [/Linking\.openURL\(([^\n;]+?)\)/g,'external / email'],
  [/<CTAButton\s+[^>]*?label=(["'][^"']+["']|\{[^}]+\})/gs,'visible CTA'],
 ];
 for(const [pattern,kind] of patterns){
  for(const x of s.matchAll(pattern)){
   const line=s.slice(0,x.index).split('\n').length;
   rows.push({file:relative(root,filename).replaceAll('\\','/'),line,kind,target:x[1].replace(/\s+/g,' ').trim().slice(0,150),status:'CODE PRESENT — NOT CLICK-TESTED'});
  }
 }
}
rows.sort((a,b)=>a.file.localeCompare(b.file)||a.line-b.line);
const csv='file,line,kind,target,status\n'+rows.map(r=>Object.values(r).map(s=>'"'+String(s).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
writeFileSync(join(root,'docs/CTA-SOURCE-CENSUS.csv'),csv);
const summary={files:files(dir).length,total:rows.length,internal:rows.filter(x=>x.kind==='internal navigation').length,external:rows.filter(x=>x.kind==='external / email').length,visible:rows.filter(x=>x.kind==='visible CTA').length};
console.log(JSON.stringify(summary));
