if(!self.define){let s,e={};const t=(t,n)=>(t=new URL(t+".js",n).href,e[t]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=t,s.onload=e,document.head.appendChild(s)}else s=t,importScripts(t),e()})).then((()=>{let s=e[t];if(!s)throw new Error(`Module ${t} didn’t register its module`);return s})));self.define=(n,r)=>{const a=s||("document"in self?document.currentScript.src:"")||location.href;if(e[a])return;let i={};const o=s=>t(s,a),c={module:{uri:a},exports:i,require:o};e[a]=Promise.all(n.map((s=>c[s]||o(s)))).then((s=>(r(...s),i)))}}define(["./workbox-2d118ab0"],(function(s){"use strict";s.setCacheNameDetails({prefix:"smart-band-test-task"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/smart-band-test-task/css/app.4e4f0461.css",revision:null},{url:"/smart-band-test-task/css/chunk-vendors.37bab8c1.css",revision:null},{url:"/smart-band-test-task/index.html",revision:"956de637c1634d264b7f35fbed849cd3"},{url:"/smart-band-test-task/js/app.ef8a99de.js",revision:null},{url:"/smart-band-test-task/js/chunk-vendors.f37688a9.js",revision:null},{url:"/smart-band-test-task/manifest.json",revision:"77bc82354fc76cb5ea0432d8b892ecee"},{url:"/smart-band-test-task/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map