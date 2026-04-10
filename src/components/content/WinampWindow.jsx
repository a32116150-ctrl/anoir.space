import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Minus, X, Zap } from 'lucide-react';

export default function WinampWindow() {
  return (
    <div className="flex flex-col h-full bg-[#191919] text-[#00ff00] font-mono select-none border-2 border-[#444]">
      {/* Winamp Header Simulation */}
      <div className="bg-[#222] p-1 flex justify-between items-center border-b border-[#333]">
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#ffd700]">WINAMP</span>
            <span className="text-[10px] text-gray-400">1.91</span>
        </div>
      </div>

      {/* Main Display */}
      <div className="p-2 bg-black m-1 border border-[#444] mb-0 relative">
        <div className="flex justify-between items-end mb-1">
            <div className="text-2xl font-bold tracking-widest text-[#00ff00]">00:00</div>
            <div className="text-[10px] text-[#00ff00] animate-pulse">STEREO</div>
        </div>
        <div className="h-4 bg-[#111] w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full flex items-end gap-[1px] opacity-50">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="bg-[#00ff00] w-1" 
                        style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                ))}
            </div>
            <div className="absolute top-0 left-0 w-full text-[10px] whitespace-nowrap overflow-hidden">
               <span className="animate-marquee inline-block">Rick Astley - Never Gonna Give You Up (Remastered 4K) *** 128kbps *** </span>
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-2">
         <div className="flex justify-between items-center bg-[#222] p-1 rounded border border-[#333] mb-2">
            <div className="h-2 w-full bg-[#111] relative">
               <div className="absolute top-0 left-0 h-full bg-[#00ff00] w-1/3"></div>
               <div className="absolute top-[-2px] left-1/3 w-3 h-3 bg-[#444] border border-[#00ff00]"></div>
            </div>
         </div>
         <div className="flex justify-center gap-4">
             <SkipBack size={16} className="text-gray-400 hover:text-white cursor-pointer" />
             <Play size={16} className="text-green-400 hover:text-green-300 cursor-pointer" />
             <Pause size={16} className="text-yellow-400 hover:text-yellow-300 cursor-pointer" />
             <SkipForward size={16} className="text-gray-400 hover:text-white cursor-pointer" />
             <Zap size={16} className="text-red-400 hover:text-red-300 cursor-pointer" />
         </div>
      </div>

      {/* Playlist / Video Area */}
      <div className="flex-1 bg-black m-1 border border-[#444] relative overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center">
             <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
             ></iframe>
         </div>
      </div>
    </div>
  );
}
