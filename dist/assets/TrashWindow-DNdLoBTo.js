import{u as n,j as s}from"./index-Cfqx64gf.js";import"./vendor-react-wGySg1uH.js";import{a2 as l,t as c,F as d,a3 as h}from"./vendor-icons-B1Ue3lrZ.js";import"./vendor-motion-O13KRk85.js";const m=r=>{const e=r.toLowerCase();return e.endsWith(".psd")||e.endsWith(".jpg")||e.endsWith(".png")?s.jsx(l,{size:40,className:"text-blue-500"}):e.endsWith(".mp4")||e.endsWith(".mov")?s.jsx(c,{size:40,className:"text-purple-500"}):e.endsWith(".doc")||e.endsWith(".txt")?s.jsx(d,{size:40,className:"text-gray-500"}):s.jsx(h,{size:40,className:"text-gray-400"})};function b({onOpenWindow:r}){const{trashItems:e}=n(),i=t=>{if(t.label.toLowerCase()==="ungreatful client brief.doc")r("fileViewer",{title:"ungreatful client brief.doc - Word",content:`CLIENT FEEDBACK - URGENT
        
1. Make the logo bigger. Like, really big.
2. Change the font to something more "pop" but also "professional". Maybe Comic Sans?
3. Can we add more white space but also fit more text in?
4. The blue is too blue. Can we make it more... energetic?
5. I showed my cat and she didn't purr. Needs more meow-factor.
6. Make it look exactly like Apple's website but using our $5 budget photos.
7. Why is there so much empty space? Fill it with "synergy".
`});else if(t.label.toLowerCase().endsWith(".psd")){const o=[`Photoshop.exe has stopped working.
Reason: The file refused to open after seeing the 57th revision.`,`Error: Scratch disks are full of regret.
Cannot open file.`,"Critical Error: Layer 'Final_Final_v3_REAL_COPY' is missing.",`System Warning: This file contains Comic Sans used non-ironically.
Opening it may damage your designer reputation.`],a=o[Math.floor(Math.random()*o.length)];r("fileViewer",{title:"Adobe Photoshop - Fatal Error",content:a})}else if(t.label.toLowerCase().endsWith(".mp4")){const o=[`Windows Media Player cannot play the file.
Error: Codec 'Client_Satisfaction_v1' is missing.`,`Render Error: Export failed at 99.9%.
Reason: Unknown.`,"Playback Error: The background music is copyright striked by a 12-year-old on YouTube.","System Error: Frame 404 not found.","Error: This video requires 'RealPlayer 1998' to run properly."],a=o[Math.floor(Math.random()*o.length)];r("fileViewer",{title:"Windows Media Player - Error",content:a})}else alert(`Cannot open "${t.label}"
The file is in the Recycle Bin.`)};return s.jsxs("div",{className:"p-4 flex flex-wrap gap-4 bg-white h-full content-start",children:[e.length===0&&s.jsx("div",{className:"w-full text-center text-gray-500 mt-10",children:"Recycle Bin is empty"}),e.map(t=>s.jsxs("div",{className:"flex flex-col items-center gap-2 w-24 group cursor-pointer hover:bg-blue-50 p-2 rounded",onDoubleClick:()=>i(t),children:[m(t.label),s.jsx("span",{className:"text-xs text-center line-clamp-2 break-all",children:t.label})]},t.id))]})}export{b as default};
