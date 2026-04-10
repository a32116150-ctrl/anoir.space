import React, { useState, useRef, useEffect } from 'react';
import { Move, Crop, Brush, Type, Layers, Wand2, Eraser } from 'lucide-react';

export default function PhotoshopWindow() {
  const [activeLayer, setActiveLayer] = useState(1);
  const [selectedTool, setSelectedTool] = useState('brush');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw initial content
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillText('PSD', 200, 175);
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedTool === 'eraser' ? 'white' : 'black';
    ctx.lineWidth = selectedTool === 'eraser' ? 20 : 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#2d2d2d] text-[#ccc] font-sans text-xs select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 p-1 bg-[#222] border-b border-[#111]">
        <span>File</span><span>Edit</span><span>Image</span><span>Layer</span><span>Type</span><span>Select</span><span>Filter</span><span>3D</span><span>View</span><span>Window</span><span>Help</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="w-10 bg-[#222] border-r border-[#111] flex flex-col items-center py-2 gap-3">
           <div onClick={() => setSelectedTool('move')} className={`p-1 rounded ${selectedTool === 'move' ? 'bg-[#444]' : ''}`}><Move size={18} className="text-gray-400 hover:text-white" /></div>
           <div onClick={() => setSelectedTool('wand')} className={`p-1 rounded ${selectedTool === 'wand' ? 'bg-[#444]' : ''}`}><Wand2 size={18} className="text-gray-400 hover:text-white" /></div>
           <div onClick={() => setSelectedTool('crop')} className={`p-1 rounded ${selectedTool === 'crop' ? 'bg-[#444]' : ''}`}><Crop size={18} className="text-gray-400 hover:text-white" /></div>
           <div onClick={() => setSelectedTool('brush')} className={`p-1 rounded ${selectedTool === 'brush' ? 'bg-[#444]' : ''}`}><Brush size={18} className="text-gray-400 hover:text-white" /></div>
           <div onClick={() => setSelectedTool('eraser')} className={`p-1 rounded ${selectedTool === 'eraser' ? 'bg-[#444]' : ''}`}><Eraser size={18} className="text-gray-400 hover:text-white" /></div>
           <div onClick={() => setSelectedTool('type')} className={`p-1 rounded ${selectedTool === 'type' ? 'bg-[#444]' : ''}`}><Type size={18} className="text-gray-400 hover:text-white" /></div>
           
           <div className="mt-auto mb-2 flex flex-col gap-1">
             <div className="w-5 h-5 bg-black border border-gray-600"></div>
             <div className="w-5 h-5 bg-white border border-gray-600 -mt-3 ml-2"></div>
           </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#1a1a1a] flex items-center justify-center overflow-auto p-4">
           <div className="relative shadow-2xl bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')]">
             <canvas 
                ref={canvasRef}
                width={500}
                height={350}
                className="cursor-crosshair bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
             />
           </div>
        </div>

        {/* Panels */}
        <div className="w-64 bg-[#222] border-l border-[#111] flex flex-col">
           {/* Color / Swatches */}
           <div className="h-40 border-b border-[#111] p-2">
             <div className="font-bold mb-1">Color</div>
             <div className="w-full h-24 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded relative">
               <div className="absolute top-2 left-1/2 w-2 h-2 border border-white rounded-full"></div>
             </div>
           </div>
           
           {/* Layers */}
           <div className="flex-1 flex flex-col">
             <div className="p-2 bg-[#2a2a2a] font-bold flex justify-between">
               <span>Layers</span>
               <Layers size={14} />
             </div>
             <div className="flex-1 overflow-y-auto bg-[#222]">
                <div 
                  className={`flex items-center gap-2 p-2 border-b border-[#333] ${activeLayer === 1 ? 'bg-[#3d3d3d]' : ''}`}
                  onClick={() => setActiveLayer(1)}
                >
                   <span className="text-gray-400">👁️</span> 
                   <div className="w-8 h-8 bg-white/20 border border-gray-600"></div>
                   <span>Text: COOL DESIGN</span>
                </div>
                <div 
                  className={`flex items-center gap-2 p-2 border-b border-[#333] ${activeLayer === 2 ? 'bg-[#3d3d3d]' : ''}`}
                  onClick={() => setActiveLayer(2)}
                >
                   <span className="text-gray-400">👁️</span> 
                   <div className="w-8 h-8 bg-yellow-300/50 border border-gray-600"></div>
                   <span>Glow Effect</span>
                </div>
                <div 
                  className={`flex items-center gap-2 p-2 border-b border-[#333] ${activeLayer === 3 ? 'bg-[#3d3d3d]' : ''}`}
                  onClick={() => setActiveLayer(3)}
                >
                   <span className="text-gray-400">👁️</span> 
                   <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 border border-gray-600"></div>
                   <span>Background</span>
                </div>
             </div>
             <div className="p-1 border-t border-[#111] flex justify-end gap-2">
                <span className="text-xs text-gray-500">📂</span>
                <span className="text-xs text-gray-500">📄</span>
                <span className="text-xs text-gray-500">🗑️</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
