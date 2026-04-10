import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { FileText, Image, Video, File } from 'lucide-react';

const getIcon = (label) => {
  const lower = label.toLowerCase();
  if (lower.endsWith('.psd') || lower.endsWith('.jpg') || lower.endsWith('.png')) return <Image size={40} className="text-blue-500" />;
  if (lower.endsWith('.mp4') || lower.endsWith('.mov')) return <Video size={40} className="text-purple-500" />;
  if (lower.endsWith('.doc') || lower.endsWith('.txt')) return <FileText size={40} className="text-gray-500" />;
  return <File size={40} className="text-gray-400" />;
};

export default function TrashWindow({ onOpenWindow }) {
  const { trashItems } = useSystem();

  const handleDoubleClick = (item) => {
    if (item.label.toLowerCase() === 'ungreatful client brief.doc') {
      onOpenWindow('fileViewer', {
        title: 'ungreatful client brief.doc - Word',
        content: `CLIENT FEEDBACK - URGENT
        
1. Make the logo bigger. Like, really big.
2. Change the font to something more "pop" but also "professional". Maybe Comic Sans?
3. Can we add more white space but also fit more text in?
4. The blue is too blue. Can we make it more... energetic?
5. I showed my cat and she didn't purr. Needs more meow-factor.
6. Make it look exactly like Apple's website but using our $5 budget photos.
7. Why is there so much empty space? Fill it with "synergy".
`
      });
    } else if (item.label.toLowerCase().endsWith('.psd')) {
      const messages = [
        "Photoshop.exe has stopped working.\nReason: The file refused to open after seeing the 57th revision.",
        "Error: Scratch disks are full of regret.\nCannot open file.",
        "Critical Error: Layer 'Final_Final_v3_REAL_COPY' is missing.",
        "System Warning: This file contains Comic Sans used non-ironically.\nOpening it may damage your designer reputation."
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      onOpenWindow('fileViewer', {
        title: 'Adobe Photoshop - Fatal Error',
        content: randomMessage
      });
    } else if (item.label.toLowerCase().endsWith('.mp4')) {
      const messages = [
        "Windows Media Player cannot play the file.\nError: Codec 'Client_Satisfaction_v1' is missing.",
        "Render Error: Export failed at 99.9%.\nReason: Unknown.",
        "Playback Error: The background music is copyright striked by a 12-year-old on YouTube.",
        "System Error: Frame 404 not found.",
        "Error: This video requires 'RealPlayer 1998' to run properly."
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      onOpenWindow('fileViewer', {
        title: 'Windows Media Player - Error',
        content: randomMessage
      });
    } else {
      alert(`Cannot open "${item.label}"\nThe file is in the Recycle Bin.`);
    }
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 bg-white h-full content-start">
      {trashItems.length === 0 && (
          <div className="w-full text-center text-gray-500 mt-10">Recycle Bin is empty</div>
      )}
      {trashItems.map(item => (
        <div 
          key={item.id} 
          className="flex flex-col items-center gap-2 w-24 group cursor-pointer hover:bg-blue-50 p-2 rounded"
          onDoubleClick={() => handleDoubleClick(item)}
        >
           {getIcon(item.label)}
           <span className="text-xs text-center line-clamp-2 break-all">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
