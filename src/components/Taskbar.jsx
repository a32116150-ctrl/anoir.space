import React, { useState } from 'react';
import { useTime } from '../hooks/useTime';
import { Monitor, Volume2, Wifi, Mail } from 'lucide-react';
import { useSystem } from '../context/SystemContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Taskbar({ openWindows, activeWindowId, onWindowClick, onStartClick }) {
  const time = useTime();
  const { minimizedWindows, restoreWindow } = useSystem();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);

  const allWindows = openWindows.filter(w => w.id !== 'settings');

  return (
    <div className="h-12 bg-[#c0c0c0] border-t-2 border-white flex items-center px-2 fixed bottom-0 left-0 right-0 z-[100] select-none shadow-[0_-2px_0_0_#808080]">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-[#808080] border-r-[#808080] shadow-win-out active:shadow-win-in font-bold mr-2 hover:bg-gray-300 transition-colors"
      >
        <div className="w-5 h-5 bg-[#008080] border border-white/50 rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-[#00ffff] opacity-80 rounded-[1px]"></div>
        </div>
        <span className="text-sm font-bold">Start</span>
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex gap-1 overflow-x-auto touch-pan-x no-scrollbar px-1 h-full items-center">
        {allWindows.map(win => {
          const isMinimized = minimizedWindows.includes(win.id);
          return (
            <button
              key={win.id}
              onClick={() => {
                if (isMinimized) restoreWindow(win.id);
                onWindowClick(win.id);
              }}
              className={`flex items-center gap-2 px-3 py-1 min-w-[100px] max-w-[180px] text-sm font-bold h-8
                ${activeWindowId === win.id && !isMinimized
                  ? 'bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white shadow-[inset_1px_1px_0_0_#808080]'
                  : 'bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-win-out'
                } ${isMinimized ? 'opacity-70' : ''}`}
            >
              <span className="truncate text-xs">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white px-3 py-1 bg-[#c0c0c0] ml-2 flex items-center gap-3 h-9">
        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="hover:bg-gray-300 p-1 relative"
          >
            <Mail size={18} className="text-gray-700" />
            {!notificationDismissed && (
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-500 rounded-full border border-yellow-600"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>

          {/* Notification Popup */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute bottom-12 right-0 w-60 bg-[#ffffcc] border-2 border-gray-600 shadow-lg p-3 z-[200]"
              >
                <div className="text-xs text-gray-500 mb-1 font-bold">💡 New Message</div>
                <p className="text-sm text-gray-800 leading-relaxed">
                  Interested in working together? I'm available for freelance & full-time opportunities!
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      window.location.href = 'mailto:cherifanoir8@gmail.com';
                      setShowNotification(false);
                      setNotificationDismissed(true);
                    }}
                    className="text-xs px-3 py-1 bg-[#000080] text-white border border-[#000080] hover:bg-[#0000a0] font-bold"
                  >
                    Contact Me
                  </button>
                  <button
                    onClick={() => {
                      setShowNotification(false);
                      setNotificationDismissed(true);
                    }}
                    className="text-xs px-3 py-1 bg-gray-200 border border-gray-400 hover:bg-gray-300 font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative Icons */}
        <Volume2 size={18} className="text-gray-600 cursor-default" />
        <Wifi size={18} className="text-gray-600 cursor-default" />

        {/* Clock */}
        <span className="text-sm font-bold min-w-[60px] text-center">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
