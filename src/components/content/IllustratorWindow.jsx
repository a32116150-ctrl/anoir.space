import React, { useState } from 'react';
import { PenTool, MousePointer2, Type, Square, Circle, Zap } from 'lucide-react';

export default function IllustratorWindow() {
  const [selectedTool, setSelectedTool] = useState('pen');
  const [shapes, setShapes] = useState([
    { type: 'path', d: "M50,400 C150,100 250,100 350,400", stroke: "orange", strokeWidth: "5", fill: "none" },
    { type: 'circle', cx: 200, cy: 200, r: 50, fill: "rgba(255, 165, 0, 0.5)", stroke: "black", strokeWidth: 2 },
    { type: 'rect', x: 100, y: 300, width: 200, height: 50, fill: "#333" },
    { type: 'text', x: 50, y: 50, text: "Final_Logo_v8.ai", fill: "black" }
  ]);

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'rect') {
      setShapes([...shapes, { 
        type: 'rect', 
        x: x - 25, 
        y: y - 25, 
        width: 50, 
        height: 50, 
        fill: '#' + Math.floor(Math.random()*16777215).toString(16) 
      }]);
    } else if (selectedTool === 'circle') {
      setShapes([...shapes, { 
        type: 'circle', 
        cx: x, 
        cy: y, 
        r: 25, 
        fill: '#' + Math.floor(Math.random()*16777215).toString(16),
        stroke: 'black',
        strokeWidth: 1
      }]);
    } else if (selectedTool === 'type') {
       setShapes([...shapes, {
         type: 'text',
         x: x,
         y: y,
         text: "Vector!",
         fill: "black"
       }]);
    }
  };

  const handleVectorize = () => {
    // Make everything blocky/ugly
    const newShapes = shapes.map(s => {
      if (s.type === 'circle') return { ...s, type: 'rect', x: s.cx - s.r, y: s.cy - s.r, width: s.r*2, height: s.r*2 };
      if (s.type === 'path') return { ...s, strokeWidth: 20, stroke: 'red' };
      return s;
    });
    setShapes(newShapes);
  };

  return (
    <div className="flex flex-col h-full bg-[#333] text-[#ccc] font-sans text-xs select-none">
      {/* Menu Bar */}
      <div className="flex gap-4 p-1 bg-[#2a2a2a] border-b border-[#111]">
        <span>File</span><span>Edit</span><span>Object</span><span>Type</span><span>Select</span><span>Effect</span><span>View</span><span>Window</span><span>Help</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="w-10 bg-[#2a2a2a] border-r border-[#111] flex flex-col items-center py-2 gap-2">
           <div className={`p-1 rounded ${selectedTool === 'select' ? 'bg-[#444]' : ''}`} onClick={() => setSelectedTool('select')}><MousePointer2 size={16} /></div>
           <div className={`p-1 rounded ${selectedTool === 'pen' ? 'bg-[#444]' : ''}`} onClick={() => setSelectedTool('pen')}><PenTool size={16} /></div>
           <div className={`p-1 rounded ${selectedTool === 'type' ? 'bg-[#444]' : ''}`} onClick={() => setSelectedTool('type')}><Type size={16} /></div>
           <div className={`p-1 rounded ${selectedTool === 'rect' ? 'bg-[#444]' : ''}`} onClick={() => setSelectedTool('rect')}><Square size={16} /></div>
           <div className={`p-1 rounded ${selectedTool === 'circle' ? 'bg-[#444]' : ''}`} onClick={() => setSelectedTool('circle')}><Circle size={16} /></div>
           <div className="mt-4 p-1 rounded hover:bg-[#444] cursor-pointer text-yellow-500" onClick={handleVectorize} title="Auto-Vectorize"><Zap size={16} /></div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#1a1a1a] flex items-center justify-center overflow-auto p-8 relative">
           {/* Artboard */}
           <div className="w-[400px] h-[500px] bg-white shadow-2xl relative" onClick={handleCanvasClick}>
              <svg width="100%" height="100%" viewBox="0 0 400 500">
                 {shapes.map((s, i) => {
                   if (s.type === 'path') return <path key={i} {...s} />;
                   if (s.type === 'circle') return <circle key={i} {...s} />;
                   if (s.type === 'rect') return <rect key={i} {...s} />;
                   if (s.type === 'text') return <text key={i} x={s.x} y={s.y} fontFamily="Arial" fontSize="24" fill={s.fill}>{s.text}</text>;
                   return null;
                 })}
                 
                 {/* Pen Tool Path Preview */}
                 {selectedTool === 'pen' && (
                    <path d="M10,10 L50,50 L20,80" stroke="blue" strokeWidth="1" fill="none" strokeDasharray="4" />
                 )}
              </svg>
           </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-[#2a2a2a] border-l border-[#111] flex flex-col p-2 gap-4">
           <div>
             <div className="font-bold mb-2">Appearance</div>
             <div className="flex justify-between items-center text-xs bg-[#333] p-1 rounded mb-1">
               <span>Stroke</span>
               <div className="w-4 h-4 bg-orange-500 border border-white"></div>
             </div>
             <div className="flex justify-between items-center text-xs bg-[#333] p-1 rounded">
               <span>Fill</span>
               <div className="w-4 h-4 border border-red-500 relative overflow-hidden">
                 <div className="absolute inset-0 border-t border-red-500 rotate-45 transform origin-center"></div>
               </div>
             </div>
           </div>
           
           <div>
             <div className="font-bold mb-2">Layers</div>
             <div className="bg-[#1a1a1a] h-40 overflow-y-auto border border-[#444]">
                <div className="flex items-center gap-2 p-1 border-b border-[#333] bg-[#333]">
                   <span className="text-blue-400">👁️</span> Layer 1
                </div>
                <div className="flex items-center gap-2 p-1 pl-4 border-b border-[#333]">
                   <span className="text-gray-500">👁️</span> <path className="w-3 h-3 bg-gray-500"/> Path
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
