import React from 'react';
import { useTime } from '../hooks/useTime';
import { Monitor } from 'lucide-react';

export default function Taskbar({ openWindows, activeWindowId, onWindowClick, onStartClick }) {
  const time = useTime();

  return (
    <div className="h-10 bg-win-gray border-t-2 border-white flex items-center px-1 fixed bottom-100 left-0 right-0 z-[100] select-none shadow-md">
      <button 
        onClick={onStartClick}
        className="flex items-center gap-1 px-2 py-1 bg-win-gray border-2 border-white shadow-win-out active:shadow-win-in font-bold mr-2 hover:bg-gray-300 transition-colors"
      >
        <Monitor size={16} className="text-black" />
        <span className="font-pixel text-xs sm:text-sm font-bold">Start</span>
      </button>
      
      <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar px-1">
        {openWindows.map(win => (
            <button
                key={win.id}
                onClick={() => onWindowClick(win.id)}
                className={`flex items-center gap-2 px-2 py-1 min-w-[100px] max-w-[160px] border-2 ${
                  activeWindowId === win.id 
                    ? 'bg-gray-200 shadow-win-in border-gray-600 border-b-white border-r-white' 
                    : 'bg-win-gray shadow-win-out border-white'
                }`}
            >
                <span className="truncate text-xs font-pixel">{win.title}</span>
            </button>
        ))}
      </div>

      <div className="border-2 border-gray-500 border-b-white border-r-white shadow-win-in px-2 py-1 bg-win-gray ml-2 min-w-[80px] text-center flex items-center justify-center">
        <span className="text-xs font-mono font-bold">
          {time.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
        </span>
      </div>
    </div>
  )
}
