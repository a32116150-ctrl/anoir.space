import React from 'react';
import { Monitor, Trash2, FileText, HardDrive, Disc, Folder } from 'lucide-react';

const DesktopIcon = ({ item, onDoubleClick, onContextMenu, variant = 'desktop' }) => {
  let Icon = FileText;
  if (item.icon === 'computer') Icon = Monitor;
  if (item.icon === 'trash') Icon = Trash2;
  if (item.icon === 'disk') Icon = HardDrive;
  if (item.icon === 'cd') Icon = Disc;
  if (item.icon === 'folder') Icon = Folder;

  const textColor = variant === 'desktop' ? 'text-white' : 'text-black';
  const textBg = variant === 'desktop' ? 'bg-black/20' : '';
  const textShadow = variant === 'desktop' ? 'drop-shadow-md' : '';
  const iconColor = variant === 'desktop' ? 'text-white' : 'text-blue-900';

  if (item.icon === 'afterEffects') {
    return (
      <div 
        className="flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group hover:bg-blue-800/20 rounded mb-2"
        onDoubleClick={() => onDoubleClick(item)}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-[#00005b] rounded-lg border border-[#9999ff] shadow-md">
          <span className="text-[#d2d2ff] font-bold text-2xl font-sans tracking-tighter">Ae</span>
        </div>
        <span className={`${textColor} text-xs text-center ${textShadow} font-sans ${textBg} px-1 rounded break-words w-full line-clamp-2`}>
          {item.label}
        </span>
      </div>
    );
  }

  if (item.icon === 'illustrator') {
    return (
      <div 
        className="flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group hover:bg-blue-800/20 rounded mb-2"
        onDoubleClick={() => onDoubleClick(item)}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-[#330000] rounded-lg border border-[#ff9900] shadow-md">
          <span className="text-[#ff9900] font-bold text-2xl font-sans tracking-tighter">Ai</span>
        </div>
        <span className={`${textColor} text-xs text-center ${textShadow} font-sans ${textBg} px-1 rounded break-words w-full line-clamp-2`}>
          {item.label}
        </span>
      </div>
    );
  }

  if (item.icon === 'photoshop') {
    return (
      <div 
        className="flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group hover:bg-blue-800/20 rounded mb-2"
        onDoubleClick={() => onDoubleClick(item)}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-[#001e36] rounded-lg border border-[#31a8ff] shadow-md">
          <span className="text-[#31a8ff] font-bold text-2xl font-sans tracking-tighter">Ps</span>
        </div>
        <span className={`${textColor} text-xs text-center ${textShadow} font-sans ${textBg} px-1 rounded break-words w-full line-clamp-2`}>
          {item.label}
        </span>
      </div>
    );
  }

  if (item.icon === 'premiere') {
    return (
      <div 
        className="flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group hover:bg-blue-800/20 rounded mb-2"
        onDoubleClick={() => onDoubleClick(item)}
        onContextMenu={(e) => onContextMenu(e, item)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-[#2a003e] rounded-lg border border-[#d29bfd] shadow-md">
          <span className="text-[#d29bfd] font-bold text-2xl font-sans tracking-tighter">Pr</span>
        </div>
        <span className={`${textColor} text-xs text-center ${textShadow} font-sans ${textBg} px-1 rounded break-words w-full line-clamp-2`}>
          {item.label}
        </span>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center gap-1 p-2 w-24 cursor-pointer group hover:bg-blue-800/20 rounded mb-2"
      onDoubleClick={() => onDoubleClick(item)}
      onContextMenu={(e) => onContextMenu(e, item)}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {item.icon === 'folder' ? (
           <Icon size={40} className="text-yellow-400 drop-shadow-md fill-current" />
        ) : (
           <Icon size={40} className={`${iconColor} drop-shadow-md`} />
        )}
      </div>
      <span className={`${textColor} text-xs text-center ${textShadow} font-sans ${textBg} px-1 rounded break-words w-full line-clamp-2`}>
        {item.label}
      </span>
    </div>
  );
};

export default DesktopIcon;
