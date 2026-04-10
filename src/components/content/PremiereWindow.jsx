import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Scissors, MousePointer2 } from 'lucide-react';

export default function PremiereWindow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(30);

  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayhead(prev => (prev + 0.5) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setPlayhead(percentage);
  };

  const handleExport = () => {
    setIsExporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setExportProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsExporting(false);
        setExportProgress(0);
        alert("Export Complete! 'final_final_v3_USETHISONE.mp4' has been saved to nowhere.");
      }
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-[#1d1d1d] text-[#ccc] font-sans text-xs select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 p-1 bg-[#1a1a1a] border-b border-[#000] items-center">
        <span>File</span><span>Edit</span><span>Clip</span><span>Sequence</span><span>Markers</span><span>Graphics</span><span>View</span><span>Window</span><span>Help</span>
        <button 
          className="ml-auto bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] hover:bg-blue-500"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? `Exporting ${exportProgress}%` : 'Export'}
        </button>
      </div>

      {/* Top Section: Source & Program Monitors */}
      <div className="flex-1 flex border-b border-[#000] min-h-0">
         {/* Source Monitor (Left) */}
         <div className="flex-1 border-r border-[#000] flex flex-col bg-[#111]">
            <div className="p-1 bg-[#222] text-xs text-gray-400">Source: Clip_01.mp4</div>
            <div className="flex-1 flex items-center justify-center bg-black relative">
               <div className="text-gray-600">No Media</div>
            </div>
            <div className="h-8 bg-[#222] flex items-center justify-center gap-4">
              <SkipBack size={14} /> <Play size={14} /> <SkipForward size={14} />
            </div>
         </div>

         {/* Program Monitor (Right) */}
         <div className="flex-1 flex flex-col bg-[#111]">
            <div className="p-1 bg-[#222] text-xs text-blue-400">Program: Sequence 01</div>
            <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">
               {/* Video Content */}
               <div className="w-3/4 h-3/4 bg-gray-800 flex items-center justify-center">
                  <div className={`transition-all duration-100 ${isPlaying ? 'scale-110' : 'scale-100'}`}>
                     <span className="text-4xl">🎬</span>
                  </div>
                  {/* Glitch Effect */}
                  {Math.random() > 0.95 && isPlaying && (
                     <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply"></div>
                  )}
               </div>
            </div>
            <div className="h-8 bg-[#222] flex items-center justify-center gap-4">
               <SkipBack size={14} /> 
               <div onClick={() => setIsPlaying(!isPlaying)} className="cursor-pointer hover:text-white">
                 {isPlaying ? <Pause size={14} /> : <Play size={14} />}
               </div>
               <SkipForward size={14} />
            </div>
         </div>
      </div>

      {/* Bottom Section: Project & Timeline */}
      <div className="h-1/2 flex min-h-0">
         {/* Project Panel */}
         <div className="w-64 bg-[#1d1d1d] border-r border-[#000] flex flex-col">
            <div className="p-1 bg-[#222] font-bold">Project: Untitled</div>
            <div className="flex-1 overflow-y-auto p-1">
               <div className="flex items-center gap-2 p-1 hover:bg-[#333]"><span className="text-purple-400">🎞️</span> Sequence 01</div>
               <div className="flex items-center gap-2 p-1 hover:bg-[#333]"><span className="text-blue-400">🎥</span> Clip_01.mp4</div>
               <div className="flex items-center gap-2 p-1 hover:bg-[#333]"><span className="text-green-400">🎵</span> Music.mp3</div>
               <div className="flex items-center gap-2 p-1 hover:bg-[#333]"><span className="text-pink-400">🖼️</span> Logo.png</div>
            </div>
         </div>

         {/* Timeline */}
         <div className="flex-1 flex flex-col bg-[#1d1d1d]">
            <div className="p-1 bg-[#222] flex justify-between">
               <span>Sequence 01</span>
               <span className="text-blue-400">00:00:14:22</span>
            </div>
            <div className="flex-1 flex">
               {/* Track Headers */}
               <div className="w-20 bg-[#222] border-r border-[#000] flex flex-col">
                  <div className="h-8 border-b border-[#000] flex items-center pl-1 text-gray-500">V2</div>
                  <div className="h-8 border-b border-[#000] flex items-center pl-1 text-gray-500">V1</div>
                  <div className="h-8 border-b border-[#000] flex items-center pl-1 text-gray-500">A1</div>
                  <div className="h-8 border-b border-[#000] flex items-center pl-1 text-gray-500">A2</div>
               </div>
               {/* Timeline Content */}
               <div 
                  className="flex-1 relative overflow-hidden bg-[#161616] cursor-pointer"
                  onClick={handleTimelineClick}
               >
                  {/* Tracks */}
                  <div className="h-8 border-b border-[#333] mt-0 relative">
                     <div className="absolute left-1/4 w-1/4 top-1 bottom-1 bg-pink-600/60 border border-pink-500 rounded px-1 truncate text-[10px]">Logo Overlay</div>
                  </div>
                  <div className="h-8 border-b border-[#333] relative">
                     <div className="absolute left-0 w-1/2 top-1 bottom-1 bg-blue-600/60 border border-blue-500 rounded px-1 truncate text-[10px]">Clip_01.mp4</div>
                     <div className="absolute left-[50%] w-1/3 top-1 bottom-1 bg-blue-600/60 border border-blue-500 rounded px-1 truncate text-[10px]">Clip_02.mp4</div>
                  </div>
                  <div className="h-8 border-b border-[#333] relative">
                     <div className="absolute left-0 w-full top-1 bottom-1 bg-green-600/60 border border-green-500 rounded px-1 truncate text-[10px]">Background Music.mp3</div>
                  </div>
                  
                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 w-[1px] bg-blue-500 z-10" style={{ left: `${playhead}%` }}>
                     <div className="w-3 h-3 bg-blue-500 -ml-1.5 -mt-1.5"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
