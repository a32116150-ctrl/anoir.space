import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CLIPPY_MESSAGES = [
  "👋 It looks like you're exploring a portfolio! Need a tour? Check the Start Menu.",
  "💡 Tip: Try right-clicking the desktop for more options!",
  "🎬 Did you know? There are 17 videos in the Video Work library!",
  "🎨 Try opening Paint — it's fully interactive!",
  "📧 Looking to hire? The Contact window has a form ready for you.",
  "⌨️ Pro tip: Press Escape to close the active window.",
  "🏆 Fun fact: This portfolio was built with React, Framer Motion, and lots of ☕",
  "🎯 Check out my Services to see what I can do for your brand!",
];

export default function Clippy() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const showTimer = setTimeout(() => {
      const randomMsg = CLIPPY_MESSAGES[Math.floor(Math.random() * CLIPPY_MESSAGES.length)];
      setMessage(randomMsg);
      setIsVisible(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(showTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!isVisible) return;
    const hideTimer = setTimeout(() => setIsVisible(false), 12000);
    return () => clearTimeout(hideTimer);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-16 right-6 z-[180] max-w-[250px] select-none"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Speech Bubble */}
          <div className="bg-[#ffffcc] border-2 border-gray-700 shadow-lg p-3 relative mb-2">
            <button
              onClick={handleDismiss}
              className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center hover:bg-gray-300 transition-colors"
              aria-label="Dismiss Clippy"
            >
              <X size={10} />
            </button>
            <p className="text-xs text-gray-800 leading-relaxed pr-4">{message}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleDismiss}
                className="text-[10px] px-2 py-0.5 bg-gray-200 border border-gray-400 hover:bg-gray-300 font-bold"
              >
                Thanks!
              </button>
              <button
                onClick={handleDismiss}
                className="text-[10px] px-2 py-0.5 bg-gray-200 border border-gray-400 hover:bg-gray-300 font-bold"
              >
                Don&apos;t show again
              </button>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-700" />
            <div className="absolute -bottom-[6px] left-[26px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#ffffcc]" />
          </div>

          {/* Clippy Character */}
          <div className="text-4xl text-center">📎</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
