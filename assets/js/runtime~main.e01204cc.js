(()=>{"use strict";var e,t,r,a,o,c={},n={};function i(e){var t=n[e];if(void 0!==t)return t.exports;var r=n[e]={exports:{}};return c[e].call(r.exports,r,r.exports,i),r.exports}i.m=c,e=[],i.O=(t,r,a,o)=>{if(!r){var c=1/0;for(f=0;f<e.length;f++){r=e[f][0],a=e[f][1],o=e[f][2];for(var n=!0,b=0;b<r.length;b++)(!1&o||c>=o)&&Object.keys(i.O).every((e=>i.O[e](r[b])))?r.splice(b--,1):(n=!1,o<c&&(c=o));if(n){e.splice(f--,1);var d=a();void 0!==d&&(t=d)}}return t}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[r,a,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var c={};t=t||[null,r({}),r([]),r(r)];for(var n=2&a&&e;"object"==typeof n&&!~t.indexOf(n);n=r(n))Object.getOwnPropertyNames(n).forEach((t=>c[t]=()=>e[t]));return c.default=()=>e,i.d(o,c),o},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>"assets/js/"+({0:"486cec19",10:"540e40c6",29:"4400bd40",48:"a94703ab",61:"1f391b9e",98:"a7bd4aaa",101:"98c6214a",134:"393be207",222:"45324c79",235:"a7456010",401:"17896441",468:"9c27c195",487:"db08f246",494:"e2bcb946",549:"c4e4c75e",647:"5e95c892",742:"aba21aa0",761:"78258116",814:"54992b48",867:"d8241c5a",917:"5e13b0db",969:"14eb3368",976:"0e384e19"}[e]||e)+"."+{0:"6dafe8a0",10:"b508e7ce",29:"83f4769a",48:"2381114e",61:"20c201c4",98:"62d947b3",101:"e39f84f9",134:"b8dbdb51",222:"b360a8d8",235:"858dfb42",237:"52da001d",401:"6ba0d2b4",468:"7ac071d6",487:"b9c49162",494:"e415406f",546:"225cb4c4",549:"8e43b40b",647:"e4a0448e",742:"1d855ffc",761:"cabf3e2a",814:"07f9641b",867:"45b69c92",917:"787ece76",969:"49897426",976:"77049aba"}[e]+".js",i.miniCssF=e=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a={},o="gl-practice-document:",i.l=(e,t,r,c)=>{if(a[e])a[e].push(t);else{var n,b;if(void 0!==r)for(var d=document.getElementsByTagName("script"),f=0;f<d.length;f++){var u=d[f];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+r){n=u;break}}n||(b=!0,(n=document.createElement("script")).charset="utf-8",n.timeout=120,i.nc&&n.setAttribute("nonce",i.nc),n.setAttribute("data-webpack",o+r),n.src=e),a[e]=[t];var l=(t,r)=>{n.onerror=n.onload=null,clearTimeout(s);var o=a[e];if(delete a[e],n.parentNode&&n.parentNode.removeChild(n),o&&o.forEach((e=>e(r))),t)return t(r)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:n}),12e4);n.onerror=l.bind(null,n.onerror),n.onload=l.bind(null,n.onload),b&&document.head.appendChild(n)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="/GL_Practice_Document/",i.gca=function(e){return e={17896441:"401",78258116:"761","486cec19":"0","540e40c6":"10","4400bd40":"29",a94703ab:"48","1f391b9e":"61",a7bd4aaa:"98","98c6214a":"101","393be207":"134","45324c79":"222",a7456010:"235","9c27c195":"468",db08f246:"487",e2bcb946:"494",c4e4c75e:"549","5e95c892":"647",aba21aa0:"742","54992b48":"814",d8241c5a:"867","5e13b0db":"917","14eb3368":"969","0e384e19":"976"}[e]||e,i.p+i.u(e)},(()=>{var e={354:0,869:0};i.f.j=(t,r)=>{var a=i.o(e,t)?e[t]:void 0;if(0!==a)if(a)r.push(a[2]);else if(/^(354|869)$/.test(t))e[t]=0;else{var o=new Promise(((r,o)=>a=e[t]=[r,o]));r.push(a[2]=o);var c=i.p+i.u(t),n=new Error;i.l(c,(r=>{if(i.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var o=r&&("load"===r.type?"missing":r.type),c=r&&r.target&&r.target.src;n.message="Loading chunk "+t+" failed.\n("+o+": "+c+")",n.name="ChunkLoadError",n.type=o,n.request=c,a[1](n)}}),"chunk-"+t,t)}},i.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,c=r[0],n=r[1],b=r[2],d=0;if(c.some((t=>0!==e[t]))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(b)var f=b(i)}for(t&&t(r);d<c.length;d++)o=c[d],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(f)},r=self.webpackChunkgl_practice_document=self.webpackChunkgl_practice_document||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})()})();