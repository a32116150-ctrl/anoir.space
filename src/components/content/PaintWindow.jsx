import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Save, ZoomIn, ZoomOut } from 'lucide-react';

export default function PaintWindow() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); // pencil, eraser
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [zoom, setZoom] = useState(1);

  const COLORS = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080', '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
    '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ffff80', '#00ff80', '#80ffff', '#8080ff', '#ff0080', '#ff8040',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use parent's scroll dimensions to allow drawing on the entire scrollable area if needed,
    // or just a fixed large size. Let's make it fixed large for now or dynamic.
    // Ideally, we want the canvas to be as big as the container initially.
    
    // Setting canvas size to a fixed large resolution to ensure quality and full coverage
    // If we want it to be responsive, we have to handle resize events carefully to not lose drawing data.
    // For a simple "Paint" app, fixed canvas size is often better. Let's stick to container size but ensure it doesn't shrink.
    
    // Create a much larger canvas to allow scrolling
    canvas.width = 2000;
    canvas.height = 1500;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    
    // Fill white background initially
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []); // Run once on mount

  useEffect(() => {
    if (contextRef.current) {
        contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
        contextRef.current.lineWidth = tool === 'eraser' ? brushSize * 4 : brushSize;
    }
  }, [color, brushSize, tool]);

  const getCoordinates = (event) => {
    if (!canvasRef.current) return { offsetX: 0, offsetY: 0 };
    
    let x, y;

    // Check if it's a touch event
    if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
    } else {
        // Fallback to mouse event
        // Using getBoundingClientRect is more reliable for offset when scaling/zooming
        const rect = canvasRef.current.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    // Adjust for zoom
    return {
        offsetX: x / zoom,
        offsetY: y / zoom
    };
  };

  const startDrawing = (event) => {
    // Prevent scrolling when touching canvas
    if (event.type === 'touchstart') {
        // Prevent default to stop scrolling/pull-to-refresh on mobile while drawing
        // But only if we are inside the canvas
        // event.preventDefault(); 
    }
    
    const { offsetX, offsetY } = getCoordinates(event);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    
    // Prevent scrolling when dragging on canvas
    // if (event.type === 'touchmove') event.preventDefault();

    const { offsetX, offsetY } = getCoordinates(event);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));

  return (
    <div className="flex flex-col h-full gap-2">
      {/* Tools & Colors */}
      <div className="flex flex-wrap gap-2 items-start shrink-0">
         {/* Tools */}
         <div className="flex flex-col gap-1">
             <button 
                onClick={() => setTool('pencil')}
                className={`w-8 h-8 border flex items-center justify-center ${tool === 'pencil' ? 'bg-win-gray-dark border-win-gray-light shadow-win-in' : 'bg-win-gray border-white shadow-win-out'}`}
                title="Pencil"
             >
                 <Pencil size={16} />
             </button>
             <button 
                onClick={() => setTool('eraser')}
                className={`w-8 h-8 border flex items-center justify-center ${tool === 'eraser' ? 'bg-win-gray-dark border-win-gray-light shadow-win-in' : 'bg-win-gray border-white shadow-win-out'}`}
                title="Eraser"
             >
                 <Eraser size={16} />
             </button>
             <button 
                onClick={clearCanvas}
                className="w-8 h-8 bg-win-gray border border-white shadow-win-out flex items-center justify-center text-[10px] font-bold"
                title="Clear All"
             >
                 X
             </button>
         </div>

         {/* Actions */}
         <div className="flex flex-col gap-1">
            <button 
                onClick={handleSave}
                className="w-8 h-8 bg-win-gray border border-white shadow-win-out flex items-center justify-center active:border-win-gray-light active:shadow-win-in"
                title="Save Image"
             >
                 <Save size={16} />
             </button>
             <div className="flex gap-0.5">
                <button 
                    onClick={handleZoomIn}
                    className="w-4 h-8 bg-win-gray border border-white shadow-win-out flex items-center justify-center active:shadow-win-in text-[10px]"
                    title="Zoom In"
                >
                    <ZoomIn size={10} />
                </button>
                <button 
                    onClick={handleZoomOut}
                    className="w-4 h-8 bg-win-gray border border-white shadow-win-out flex items-center justify-center active:shadow-win-in text-[10px]"
                    title="Zoom Out"
                >
                    <ZoomOut size={10} />
                </button>
             </div>
             <div className="text-[10px] text-center font-mono">{Math.round(zoom * 100)}%</div>
         </div>
         
         {/* Colors */}
         <div className="flex-1 bg-win-gray border-2 border-win-gray-light shadow-win-in p-1">
            <div className="flex flex-wrap gap-0.5 w-full h-full content-start">
                {COLORS.map(c => (
                    <div 
                        key={c}
                        onClick={() => { setColor(c); setTool('pencil'); }}
                        className={`w-4 h-4 cursor-pointer border ${color === c ? 'border-black z-10 scale-125' : 'border-gray-500'}`}
                        style={{ backgroundColor: c }}
                    ></div>
                ))}
            </div>
         </div>

         {/* Brush Size */}
         <div className="flex flex-col gap-1 w-8">
            {[2, 4, 6, 8].map(s => (
                <div 
                    key={s}
                    onClick={() => setBrushSize(s)}
                    className={`h-4 w-full flex items-center justify-center cursor-pointer border ${brushSize === s ? 'bg-win-blue text-white' : 'bg-white'}`}
                >
                    <div className="bg-black rounded-full" style={{ width: s, height: s }}></div>
                </div>
            ))}
         </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gray-400 p-1 border-2 border-gray-600 shadow-inner overflow-auto relative touch-none">
        <div style={{ 
            width: '2000px', 
            height: '1500px', 
            transform: `scale(${zoom})`, 
            transformOrigin: 'top left',
            transition: 'transform 0.1s ease-out'
        }}>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={finishDrawing}
                onTouchStart={startDrawing}
                onTouchEnd={finishDrawing}
                onTouchMove={draw}
                className="bg-white cursor-crosshair block"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
      </div>
    </div>
  );
}
