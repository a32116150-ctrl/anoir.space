import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContextMenu({ menu, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!menu) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [menu, onClose]);

  if (!menu) return null;

  const adjustPosition = () => {
    if (!ref.current) return { left: menu.x, top: menu.y };
    const rect = ref.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 10;
    const maxY = window.innerHeight - rect.height - 10;
    return {
      left: Math.min(menu.x, maxX),
      top: Math.min(menu.y, maxY),
    };
  };

  const pos = adjustPosition();

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="fixed z-[200] bg-win-gray win95-border-out min-w-[180px] py-0.5 select-none shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]"
        style={{ left: pos.left, top: pos.top, fontFamily: "'Pixelify Sans', cursive" }}
      >
        {menu.items.map((item, idx) => (
          item.separator ? (
            <div key={idx} className="border-t border-gray-400 my-0.5 mx-2" />
          ) : (
            <button
              key={idx}
              disabled={item.disabled}
              onClick={() => {
                if (item.action) item.action();
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-1.5 text-left text-sm font-sans font-bold transition-colors duration-75
                ${item.disabled ? 'text-gray-500' : 'hover:bg-[#000080] hover:text-white'}
              `}
            >
              {item.icon && <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
              {item.checked && <span className="text-xs">&#10003;</span>}
              {item.shortcut && <span className="text-[10px] text-gray-500 ml-4">{item.shortcut}</span>}
            </button>
          )
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
