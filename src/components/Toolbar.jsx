import React from 'react';
import { Search, PaintBucket, Type, MousePointer, Monitor, Share2, Briefcase, Settings, Palette } from 'lucide-react';

export default function Toolbar({ onOpenWindow, showColorBox }) {
  const tools = [
    { id: 'about', icon: Search, label: 'About Me' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'paint', icon: Palette, label: 'Paint' },
    { id: 'services', icon: PaintBucket, label: 'Services' },
    { id: 'network', icon: Share2, label: 'Connect' },
    { id: 'settings', icon: Settings, label: 'Display Properties' },
    { id: 'contact', icon: Type, label: 'Contact' },
  ];

  return (
    <div className="w-16 sm:w-20 bg-win-gray border-r-2 border-white shadow-win-out flex flex-col items-center py-2 z-40 shrink-0">
      {/* Decorative Handle */}
      <div className="w-12 h-1 bg-gray-400 mb-1"></div>
      
      <div className="flex flex-col gap-1 p-1 w-full items-center">
         {/* Standard Mouse Tool (Static) */}
         <div className="w-12 h-12 flex items-center justify-center border-2 border-transparent active:shadow-win-in bg-win-gray shadow-win-out mb-2">
            <MousePointer size={24} />
         </div>

         {/* Action Tools */}
         <div className="grid grid-cols-1 gap-1">
            {tools.map((tool) => (
            <button
                key={tool.id}
                onClick={() => onOpenWindow(tool.id)}
                className="w-12 h-12 flex items-center justify-center bg-win-gray border-2 border-win-gray-light shadow-win-out active:shadow-win-in hover:bg-gray-300 transition-colors"
                title={tool.label}
            >
                <tool.icon size={24} className="text-black" />
            </button>
            ))}
         </div>
      </div>
      
      {/* Fake Color Palette at bottom */}
      {showColorBox && (
      <div className="mt-auto p-2 w-full flex flex-col items-center">
        <div className="w-full aspect-square bg-black border-2 border-gray-600 shadow-win-in mb-1"></div>
        <div className="grid grid-cols-4 gap-0.5 w-full">
            {[...Array(8)].map((_, i) => (
                <div key={i} className={`aspect-square border border-gray-600 ${i % 2 === 0 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            ))}
        </div>
      </div>
      )}
    </div>
  );
}
