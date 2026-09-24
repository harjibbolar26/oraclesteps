import {cp,mkdir} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});
await cp('.output/server','dist/server',{recursive:true});
await cp('.output/public','dist/client',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
await cp('.openai/hosting.json','dist/.openai/hosting.json');
await cp('.output/server/index.mjs','dist/server/index.js');
