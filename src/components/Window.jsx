import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';

export default function Window({ 
  id, 
  title, 
  children, 
  isOpen, 
  onClose, 
  isActive, 
  onFocus, 
  zIndex, 
  isMobile 
}) {
  const dragControls = useDragControls();
  const windowRef = useRef(null);
  
  // Default size state
  const [size, setSize] = useState({ width: 500, height: 400 });

  // Update size if on mobile to be fit screen initially but allowing resize
  useEffect(() => {
    if (isMobile) {
      setSize({ width: window.innerWidth * 0.9, height: 400 });
    } else {
        // Reset to reasonable defaults if switching back to desktop
        setSize({ width: 500, height: 400 });
    }
  }, [isMobile]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ 
        zIndex, 
        position: 'absolute',
        top: isMobile ? '10px' : '50px',
        left: isMobile ? '10px' : '50px',
        width: size.width,
        height: size.height,
        marginBottom: 0,
      }}
      className="bg-win-gray border-2 border-win-gray-light shadow-win-out flex flex-col min-w-[300px] max-w-[90vw]"
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Title Bar - Draggable Handle */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className={`px-2 py-1 flex justify-between items-center select-none cursor-default shrink-0 ${isActive ? 'bg-win-blue text-white' : 'bg-win-gray-dark text-gray-300'}`}
        style={{ touchAction: 'none' }}
      >
        <span className="font-pixel text-xs truncate mr-4">{title}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="bg-win-gray text-black border border-white shadow-win-out active:shadow-win-in w-5 h-5 flex items-center justify-center hover:bg-gray-100 focus:outline-none"
          aria-label="Close"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* Window Body */}
      <div className="p-1 flex-1 flex flex-col min-h-0">
        <div className="bg-white border-2 border-gray-500 shadow-win-in p-4 overflow-auto h-full text-base">
            {children}
        </div>
      </div>

      {/* Resize Handle (Bottom Right) */}
      <motion.div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5"
            drag
            dragMomentum={false}
            onDrag={(event, info) => {
                setSize(prev => ({
                    width: Math.max(300, prev.width + info.delta.x),
                    height: Math.max(200, prev.height + info.delta.y)
                }));
            }}
            // Reset position after drag to keep handle in corner
            dragElastic={0}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} 
        >
            {/* Retro Resize Grip Graphic */}
            <div className="w-full h-full relative">
                <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-3 right-1 w-0.5 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-1 right-3 w-0.5 h-0.5 bg-gray-400"></div>
                <div className="absolute bottom-2 right-2 w-0.5 h-0.5 bg-gray-400"></div>
            </div>
        </motion.div>
    </motion.div>
  );
}
