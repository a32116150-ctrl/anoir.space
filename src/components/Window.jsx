import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export default function Window({
  id,
  title,
  children,
  isOpen,
  onClose,
  isActive,
  onFocus,
  zIndex,
  isMobile,
  initialWidth = 500,
  initialHeight = 400
}) {
  const dragControls = useDragControls();
  const windowRef = useRef(null);
  const { minimizeWindow } = useSystem();

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  // Center the window on the screen by default
  const getInitialPosition = () => {
    // Default fallback values if window is not available
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    
    // Calculate centered position
    // We add a little random offset so multiple windows don't stack exactly on top of each other
    const randomOffset = Math.random() * 20 - 10;
    
    return {
      x: Math.max(10, (vw - initialWidth) / 2) + randomOffset,
      y: Math.max(10, (vh - initialHeight) / 2) + randomOffset
    };
  };

  const [position, setPosition] = useState(getInitialPosition());
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevSize, setPrevSize] = useState({ width: initialWidth, height: initialHeight });
  const [prevPosition, setPrevPosition] = useState(getInitialPosition());

  useEffect(() => {
    if (isMobile) {
      setSize({ width: window.innerWidth * 0.9, height: window.innerHeight * 0.7 });
    }
  }, [isMobile]);

  const handleMinimize = (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (isMaximized) {
      setSize(prevSize);
      setPosition(prevPosition);
      setIsMaximized(false);
    } else {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth - 20, height: window.innerHeight - 60 });
      setPosition({ x: 10, y: 10 });
      setIsMaximized(true);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      style={{
        zIndex,
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: isMaximized ? 'calc(100vw - 20px)' : size.width,
        height: isMaximized ? 'calc(100vh - 70px)' : size.height,
      }}
      className="bg-win-gray border-2 border-win-gray-light shadow-win-out flex flex-col min-w-[300px] max-w-[calc(100vw-10px)] max-h-[calc(100vh-70px)]"
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      role="dialog"
      aria-label={title}
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => {
          if (!isMaximized) dragControls.start(e);
        }}
        className={`px-1.5 py-1 flex justify-between items-center select-none cursor-default shrink-0
          ${isActive
            ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white'
            : 'bg-gradient-to-r from-[#808080] to-[#b4b4b4] text-gray-200'
          }`}
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center gap-1.5 truncate mr-2">
          <div className="w-3 h-3 bg-[#008080] border border-white/30 rounded-sm flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-[#00ffff] opacity-70 rounded-[1px]"></div>
          </div>
          <span className="font-sans text-xs font-bold truncate">{title}</span>
        </div>

        <div className="flex gap-1 shrink-0">
          <button
            onClick={handleMinimize}
            aria-label="Minimize"
            className="w-6 h-6 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-[#808080] shadow-win-out active:shadow-win-in flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            <Minus size={14} strokeWidth={3} className="text-black" />
          </button>
          <button
            onClick={handleMaximize}
            aria-label="Maximize"
            className="w-6 h-6 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-[#808080] shadow-win-out active:shadow-win-in flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            <Square size={12} strokeWidth={2.5} className="text-black" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="w-6 h-6 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-[#808080] shadow-win-out active:shadow-win-in flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            <X size={14} strokeWidth={3} className="text-black" />
          </button>
        </div>
      </div>

      {/* Menu bar placeholder */}
      <div className="h-5 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-1 text-xs font-sans gap-2 select-none">
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">File</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">Edit</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">View</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">Help</span>
      </div>

      {/* Window Body */}
      <div className="p-0.5 flex-1 flex flex-col min-h-0">
        <div className="bg-white border-2 border-[#808080] shadow-win-in p-1 overflow-auto h-full">
          <div className="min-h-full" style={{ fontFamily: 'inherit' }}>
            {children}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-1 text-[10px] font-sans select-none">
        <span className="text-gray-600">{isMaximized ? 'Maximized' : `${size.width}x${size.height}`}</span>
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          drag
          dragMomentum={false}
          onDrag={(event, info) => {
            setSize(prev => ({
              width: Math.max(300, Math.min(prev.width + info.delta.x, window.innerWidth - 40)),
              height: Math.max(200, Math.min(prev.height + info.delta.y, window.innerHeight - 80))
            }));
          }}
          dragElastic={0}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="w-full h-full relative">
            <div className="absolute bottom-0.5 right-0.5 w-[2px] h-[2px] bg-[#808080]"></div>
            <div className="absolute bottom-1.5 right-0.5 w-[2px] h-[2px] bg-[#808080]"></div>
            <div className="absolute bottom-0.5 right-1.5 w-[2px] h-[2px] bg-[#808080]"></div>
            <div className="absolute bottom-2.5 right-0.5 w-[2px] h-[2px] bg-[#808080]"></div>
            <div className="absolute bottom-0.5 right-2.5 w-[2px] h-[2px] bg-[#808080]"></div>
            <div className="absolute bottom-1.5 right-1.5 w-[2px] h-[2px] bg-[#808080]"></div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
