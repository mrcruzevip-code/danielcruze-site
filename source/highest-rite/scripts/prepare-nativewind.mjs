import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
const require=createRequire(import.meta.url);
const root=path.resolve(import.meta.dirname,'..');
const interop=path.dirname(require.resolve('react-native-css-interop/package.json'));
const cache=path.join(interop,'.cache');
fs.mkdirSync(cache,{recursive:true});
for(const platform of ['android','ios','macos','native','windows']) {
 const file=path.join(cache,platform+'.js');if(!fs.existsSync(file))fs.writeFileSync(file,'');
}
const tailwind=path.join(path.dirname(require.resolve('tailwindcss/package.json')),'lib/cli.js');
const result=spawnSync(process.execPath,[tailwind,'--input',path.join(root,'global.css'),'--output',path.join(cache,'web.css')],{cwd:root,stdio:'inherit'});
if(result.status!==0)process.exit(result.status??1);
console.log('NativeWind production CSS exists before Metro file-map creation.');
