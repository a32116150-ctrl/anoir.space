import React, { useState, useEffect, useCallback } from 'react';
import { testimonials } from '../../data/content';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function TypingText({ text, speed = 25, onComplete }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
  }, [text]);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayText, text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {displayText.length < text.length && (
        <span className="inline-block w-[2px] h-3 bg-gray-800 ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

export default function TestimonialsWindow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const testimonial = testimonials[currentIndex];

  const handlePrev = useCallback(() => {
    setIsTyping(true);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleNext = useCallback(() => {
    setIsTyping(true);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Notepad-style menu bar */}
      <div className="h-5 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-1 text-xs gap-2 select-none shrink-0">
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">File</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">Edit</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">Format</span>
        <span className="px-1.5 hover:bg-[#000080] hover:text-white cursor-default">Help</span>
      </div>

      {/* Title */}
      <div className="bg-gray-100 border-b border-gray-300 px-3 py-1.5 text-xs text-gray-600 font-sans font-bold flex items-center justify-between shrink-0">
        <span>📝 client_testimonials.txt — Testimonial {currentIndex + 1} of {testimonials.length}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Quote */}
            <div className="mb-4 leading-relaxed text-sm text-gray-800 min-h-[80px]">
              <span className="text-2xl text-[#000080] font-serif leading-none">"</span>
              <TypingText
                text={testimonial.text}
                speed={20}
                onComplete={() => setIsTyping(false)}
              />
              <span className="text-2xl text-[#000080] font-serif leading-none">"</span>
            </div>

            {/* Attribution */}
            <motion.div
              className="border-t border-gray-300 pt-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTyping ? 0 : 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="font-bold text-sm text-gray-900 font-sans">{testimonial.name}</div>
              <div className="text-xs text-gray-500 font-sans">{testimonial.role}</div>

              {/* Star rating */}
              <div className="flex gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-3 py-2 border-t border-gray-300 bg-[#c0c0c0] shrink-0">
        <div className="flex gap-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentIndex(i); setIsTyping(true); }}
              className={`w-4 h-4 border text-[9px] font-bold flex items-center justify-center ${
                i === currentIndex
                  ? 'bg-[#000080] text-white border-[#000080]'
                  : 'bg-white border-gray-400 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={handlePrev}
            className="px-2 py-0.5 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold hover:bg-gray-300"
          >
            <ChevronLeft size={12} />
          </button>
          <button
            onClick={handleNext}
            className="px-2 py-0.5 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold hover:bg-gray-300"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
