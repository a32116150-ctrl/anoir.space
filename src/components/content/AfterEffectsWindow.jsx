import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward } from 'lucide-react';

export default function AfterEffectsWindow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [renderMessage, setRenderMessage] = useState('');

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    let interval;
    if (isRendering) {
      interval = setInterval(() => {
        setRenderProgress(prev => {
          if (prev >= 99) {
            setRenderMessage('Error: Out of Memory. (RAM is expensive, you know?)');
            setIsRendering(false);
            clearInterval(interval);
            return 99;
          }
          // Randomly stall
          if (Math.random() > 0.8) return prev; 
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRendering]);

  const handleRender = () => {
    setRenderProgress(0);
    setIsRendering(true);
    setRenderMessage('Rendering... Estimated time: 2 hours');
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const parent = e.currentTarget.offsetParent.getBoundingClientRect();
      const x = ((e.clientX - parent.left) / parent.width) * 100;
      const y = ((e.clientY - parent.top) / parent.height) * 100;
      setPosition({ x, y });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#232323] text-[#cccccc] font-sans text-xs select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 p-1 bg-[#1f1f1f] border-b border-[#111]">
        <span>File</span><span>Edit</span><span>Composition</span><span>Layer</span><span>Effect</span><span>Animation</span><span>View</span><span>Window</span><span>Help</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Project Panel */}
        <div className="w-64 flex flex-col border-r border-[#111] bg-[#232323]">
          <div className="p-2 bg-[#2d2d2d] border-b border-[#111] font-bold">Project</div>
          <div className="flex-1 p-2 overflow-y-auto">
            <div className="flex items-center gap-2 hover:bg-[#333] p-1"><span className="text-yellow-500">📁</span> Compositions</div>
            <div className="flex items-center gap-2 hover:bg-[#333] p-1 pl-6"><span className="text-pink-500">🎞️</span> Main_Comp_Final</div>
            <div className="flex items-center gap-2 hover:bg-[#333] p-1 pl-6"><span className="text-pink-500">🎞️</span> Pre-comp 1</div>
            <div className="flex items-center gap-2 hover:bg-[#333] p-1"><span className="text-yellow-500">📁</span> Solids</div>
            <div className="flex items-center gap-2 hover:bg-[#333] p-1 pl-6"><span className="text-gray-400">⬜</span> Deep Blue Solid 1</div>
            <div className="flex items-center gap-2 hover:bg-[#333] p-1"><span className="text-green-500">🖼️</span> logo_v99.png</div>
          </div>
          <div className="p-2 border-t border-[#111]">
             <button 
               className="w-full bg-[#333] hover:bg-[#444] text-white p-1 rounded border border-[#555]"
               onClick={handleRender}
               disabled={isRendering}
             >
               {isRendering ? `Rendering ${renderProgress}%` : 'Add to Render Queue'}
             </button>
             {renderMessage && <div className="text-red-500 text-[10px] mt-1 break-words">{renderMessage}</div>}
          </div>
        </div>

        {/* Composition Panel */}
        <div className="flex-1 flex flex-col bg-[#111]">
          <div className="p-1 bg-[#2d2d2d] flex justify-between items-center text-xs">
            <span>Main_Comp_Final</span>
            <span>50%</span>
          </div>
          <div 
             className="flex-1 flex items-center justify-center relative overflow-hidden"
             onMouseMove={handleDrag}
             onMouseUp={handleDragEnd}
             onMouseLeave={handleDragEnd}
          >
             {/* The "Animation" */}
             <div className="relative w-64 h-64 bg-black border border-[#333]">
                {/* Moving Box */}
                <div 
                  className="absolute w-10 h-10 bg-blue-500 border border-white cursor-move"
                  style={{ 
                    left: `${isPlaying ? (Math.sin(currentTime / 10) * 40) + 50 : position.x}%`, 
                    top: `${isPlaying ? (Math.cos(currentTime / 10) * 40) + 50 : position.y}%`,
                    transform: `rotate(${currentTime * 5}deg)`
                  }}
                  onMouseDown={handleDragStart}
                ></div>
                
                {renderMessage.includes('Error') && (
                   <div className="absolute inset-0 bg-[#880000] flex flex-col items-center justify-center text-white p-4 text-center">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="font-bold">MEDIA PENDING</div>
                      <div className="text-[10px] mt-2 opacity-70">After Effects has encountered an unexpected error.</div>
                   </div>
                )}
                {/* Text appearing */}
                {currentTime > 20 && currentTime < 80 && (
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl drop-shadow-lg">
                    MOTION DESIGN
                  </div>
                )}
             </div>
          </div>
          {/* Playback Controls */}
          <div className="h-10 bg-[#2d2d2d] flex items-center justify-center gap-4 border-t border-[#111]">
            <SkipBack size={16} />
            <div onClick={() => setIsPlaying(!isPlaying)} className="cursor-pointer hover:text-white">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </div>
            <SkipForward size={16} />
          </div>
        </div>
      </div>

      {/* Timeline Panel */}
      <div className="h-1/3 flex flex-col border-t border-[#111] bg-[#232323]">
        <div className="h-8 bg-[#2d2d2d] border-b border-[#111] flex items-center px-2 justify-between">
           <div className="flex gap-2">
             <span className="font-bold text-blue-400">Main_Comp_Final</span>
             <span className="text-gray-500">0:00:04:12</span>
           </div>
           <button 
             onClick={handleRender}
             className="bg-[#00005b] px-3 py-1 rounded border border-[#9999ff] text-white hover:bg-[#00008b] active:bg-[#00004b] transition-colors"
           >
             Render
           </button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {/* Layer List */}
          <div className="w-64 border-r border-[#333] flex flex-col text-xs">
             <div className="flex items-center h-6 bg-[#2a2a2a] pl-2 border-b border-[#333]"># Layer Name</div>
             <div className="flex items-center h-6 hover:bg-[#333] pl-2 border-b border-[#333] text-pink-400">1 [Text]</div>
             <div className="flex items-center h-6 hover:bg-[#333] pl-2 border-b border-[#333] text-blue-400">2 [Shape Layer 1]</div>
             <div className="flex items-center h-6 hover:bg-[#333] pl-2 border-b border-[#333] text-purple-400">3 [Camera 1]</div>
             <div className="flex items-center h-6 hover:bg-[#333] pl-2 border-b border-[#333] text-orange-400">4 [Adjustment Layer]</div>
          </div>
          {/* Timeline Graph */}
          <div className="flex-1 bg-[#1f1f1f] relative overflow-hidden">
             {/* Time Ruler */}
             <div className="h-6 border-b border-[#333] flex items-end pb-1 text-[10px] text-gray-500">
               <span className="ml-10">0s</span>
               <span className="ml-20">1s</span>
               <span className="ml-20">2s</span>
               <span className="ml-20">3s</span>
             </div>
             
             {/* Layer Bars */}
             <div className="mt-[1px]">
               <div className="h-6 border-b border-[#333] relative"><div className="absolute left-20 right-10 top-1 bottom-1 bg-pink-900/50 border border-pink-700 rounded"></div></div>
               <div className="h-6 border-b border-[#333] relative"><div className="absolute left-0 right-0 top-1 bottom-1 bg-blue-900/50 border border-blue-700 rounded"></div></div>
               <div className="h-6 border-b border-[#333] relative"><div className="absolute left-0 right-0 top-1 bottom-1 bg-purple-900/50 border border-purple-700 rounded"></div></div>
               <div className="h-6 border-b border-[#333] relative"><div className="absolute left-0 right-0 top-1 bottom-1 bg-orange-900/50 border border-orange-700 rounded"></div></div>
             </div>

             {/* Playhead */}
             <div 
               className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10 pointer-events-none"
               style={{ left: `${currentTime}%` }}
             >
               <div className="w-3 h-3 bg-red-500 -ml-1.5 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Render Status Dialog Overlay */}
      {isRendering && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2d2d2d] border border-gray-600 p-4 w-96 shadow-2xl rounded">
            <div className="mb-2 text-white font-bold">Render Queue</div>
            <div className="text-xs mb-2 text-gray-300">{renderMessage}</div>
            <div className="w-full h-4 bg-[#111] rounded overflow-hidden border border-[#333]">
              <div 
                className={`h-full ${renderProgress >= 99 ? 'bg-red-600' : 'bg-green-600'}`} 
                style={{ width: `${renderProgress}%` }}
              ></div>
            </div>
            {renderProgress >= 99 && (
              <button 
                onClick={() => setIsRendering(false)}
                className="mt-4 px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-xs"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
