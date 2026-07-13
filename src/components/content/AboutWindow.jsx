import React, { useState, useEffect } from 'react';
import { aboutMe, personalInfo, stats, notableClients } from '../../data/content';
import { Download, Mail, Briefcase, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

function TypewriterText({ text, speed = 30, delay = 0, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayText, text, speed, started, onComplete]);

  return (
    <span>
      {displayText}
      {displayText.length < text.length && started && (
        <span className="inline-block w-[2px] h-4 bg-current ml-0.5 animate-pulse" />
      )}
    </span>
  );
}

export default function AboutWindow({ onOpenWindow }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-base leading-relaxed" style={{ fontFamily: 'inherit' }}>
      {/* Header Section */}
      <div className="flex gap-4 mb-5">
        {/* Profile Avatar */}
        <div className="w-28 h-28 bg-gradient-to-br from-[#000080] to-[#008080] border-2 border-gray-500 shadow-win-in flex-shrink-0 flex items-center justify-center overflow-hidden relative">
          {/* Pixel art style avatar */}
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#000050] via-[#000080] to-[#006060]">
            <div className="text-5xl select-none" style={{ imageRendering: 'pixelated' }}>
              👨‍🎨
            </div>
            {/* Decorative pixels */}
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-cyan-400 opacity-60" />
            <div className="absolute bottom-1 right-4 w-1 h-1 bg-cyan-300 opacity-40" />
            <div className="absolute bottom-3 right-1 w-1 h-1 bg-blue-300 opacity-40" />
            <div className="absolute top-1 left-1 w-2 h-2 bg-blue-400 opacity-30" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-xl mb-0.5 text-gray-900">Anoir Cherif</h2>
          <p className="text-[#000080] font-bold italic mb-1.5 text-sm">
            <TypewriterText text="Visual Creator & Motion Designer" speed={40} />
          </p>
          <p className="text-gray-600 text-sm mb-2">📍 {personalInfo.location}</p>

          {/* Quick Stats */}
          <div className="flex gap-3 flex-wrap">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-gray-100 border border-gray-300 px-2 py-1 text-center shadow-win-in"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-sm font-bold text-[#000080]">{stat.value}</div>
                <div className="text-[10px] text-gray-500 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <motion.div
        className="bg-white border-2 border-gray-400 p-3 shadow-win-in mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm leading-relaxed text-gray-800">{personalInfo.bio}</p>
      </motion.div>

      {/* Notable Clients */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Notable Clients</div>
        <div className="flex flex-wrap gap-1.5">
          {notableClients.map((client, i) => (
            <motion.span
              key={client}
              className="bg-gray-200 border border-gray-400 px-2 py-0.5 text-xs text-gray-700 shadow-sm hover:bg-[#000080] hover:text-white hover:border-[#000080] transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              {client}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-2 border-t border-gray-300 pt-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() => onOpenWindow?.('portfolio')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000080] text-white border-2 border-white shadow-win-out active:shadow-win-in text-sm font-bold hover:bg-[#0000a0] transition-colors"
        >
          <Briefcase size={14} />
          View My Work
        </button>
        <button
          onClick={() => onOpenWindow?.('timeline')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-win-gray border-2 border-white shadow-win-out active:shadow-win-in text-sm font-bold hover:bg-gray-300 transition-colors"
        >
          <ExternalLink size={14} />
          My Career
        </button>
        <button
          onClick={() => onOpenWindow?.('contact')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-win-gray border-2 border-white shadow-win-out active:shadow-win-in text-sm font-bold hover:bg-gray-300 transition-colors"
        >
          <Mail size={14} />
          Contact Me
        </button>
        <a
          href="/resume.pdf"
          download="Anoir_Cherif_Resume.pdf"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-win-gray border-2 border-white shadow-win-out active:shadow-win-in text-sm font-bold hover:bg-gray-300 transition-colors no-underline text-black"
        >
          <Download size={14} />
          Resume
        </a>
      </motion.div>
    </div>
  );
}
