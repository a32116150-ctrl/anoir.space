import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useDragControls, useAnimation } from 'framer-motion';
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
  const controls = useAnimation();
  const { minimizeWindow } = useSystem();

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const getInitialPosition = () => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    const randomOffset = Math.random() * 20 - 10;
    return {
      x: Math.max(10, (vw - initialWidth) / 2) + randomOffset,
      y: Math.max(10, (vh - initialHeight) / 2) + randomOffset
    };
  };

  const [position, setPosition] = useState(getInitialPosition());
  const [isMaximized, setIsMaximized] = useState(isMobile);
  const [prevSize, setPrevSize] = useState({ width: initialWidth, height: initialHeight });
  const [prevPosition, setPrevPosition] = useState(getInitialPosition());
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  const handleMinimize = useCallback((e) => {
    e.stopPropagation();
    setIsMinimizing(true);
    setTimeout(() => {
      minimizeWindow(id);
      setIsMinimizing(false);
    }, 200);
  }, [id, minimizeWindow]);

  const handleMaximize = useCallback((e) => {
    e.stopPropagation();
    if (isMaximized) {
      setSize(prevSize);
      setPosition(prevPosition);
      setIsMaximized(false);
    } else {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  }, [isMaximized, prevSize, prevPosition, size, position]);

  const handleDragEnd = useCallback((event, info) => {
    setIsDragging(false);
    if (isMaximized) return;
    const vw = window.innerWidth;
    const threshold = 40;
    let newPos = { ...position };
    newPos.x += info.offset.x;
    newPos.y += info.offset.y;
    newPos.x = Math.max(0, Math.min(newPos.x, vw - size.width));
    newPos.y = Math.max(0, Math.min(newPos.y, window.innerHeight - 60));
    setPosition(newPos);
  }, [isMaximized, position, size]);

  useEffect(() => {
    if (isMobile && !isMaximized) {
      setIsMaximized(true);
    }
  }, [isMobile]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={isMinimizing
        ? { scale: 0.3, opacity: 0, y: 200 }
        : { scale: 1, opacity: 1, y: 0 }
      }
      exit={{ scale: 0.85, opacity: 0 }}
      transition={isMinimizing
        ? { duration: 0.2, ease: 'easeIn' }
        : { type: 'spring', stiffness: 400, damping: 30 }
      }
      style={{
        zIndex,
        position: 'fixed',
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100dvh - 48px)' : size.height,
      }}
      className={`bg-win-gray flex flex-col min-w-[300px] max-w-[100vw] max-h-[calc(100dvh-48px)] select-none
        ${isActive
          ? 'win95-border-out shadow-[4px_4px_0_0_rgba(0,0,0,0.3),0_0_12px_2px_rgba(0,0,128,0.15)]'
          : 'border-2 border-win-gray-light shadow-[2px_2px_0_0_rgba(0,0,0,0.15)]'
        }
        ${isDragging ? 'opacity-90' : ''}
      `}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      role="dialog"
      aria-label={title}
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e);
          }
        }}
        className={`px-1.5 py-1 flex justify-between items-center select-none cursor-default shrink-0
          ${isActive
            ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white'
            : 'bg-gradient-to-r from-[#808080] to-[#a0a0a0] text-gray-300'
          }
          ${isDragging ? 'opacity-80' : ''}
        `}
        style={{ touchAction: 'none' }}
      >
        <div className="flex items-center gap-1.5 truncate mr-2">
          <div className="w-3 h-3 bg-[#008080] border border-white/30 rounded-sm flex items-center justify-center shrink-0">
            <div className="w-1.5 h-1.5 bg-[#00ffff] opacity-70 rounded-[1px]"></div>
          </div>
          <span className="font-sans text-xs font-bold truncate">{title}</span>
        </div>

        <div className="flex gap-0.5 shrink-0">
          <button
            onClick={handleMinimize}
            aria-label="Minimize"
            className="w-5 h-5 md:w-6 md:h-6 bg-[#c0c0c0] win95-btn flex items-center justify-center hover:brightness-105 focus:outline-none"
          >
            <Minus size={12} strokeWidth={3} className="text-black" />
          </button>
          <button
            onClick={handleMaximize}
            aria-label="Maximize"
            className="w-5 h-5 md:w-6 md:h-6 bg-[#c0c0c0] win95-btn flex items-center justify-center hover:brightness-105 focus:outline-none"
          >
            <Square size={10} strokeWidth={2.5} className="text-black" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="w-5 h-5 md:w-6 md:h-6 bg-[#c0c0c0] win95-btn flex items-center justify-center hover:brightness-105 focus:outline-none"
          >
            <X size={12} strokeWidth={3} className="text-black" />
          </button>
        </div>
      </div>

      {/* Menu bar */}
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
