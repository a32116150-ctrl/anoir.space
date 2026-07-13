import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Briefcase, User, Palette, Mail, Star } from 'lucide-react';

const WIZARD_STEPS = [
  {
    title: "Welcome to Anoir's Portfolio",
    icon: Star,
    content: "Thanks for visiting! This interactive portfolio is designed as a Windows 95 desktop — because creativity should be fun to explore.",
    hint: "Everything here is clickable, draggable, and interactive.",
    iconEmoji: "🖥️",
  },
  {
    title: "Explore My Work",
    icon: Briefcase,
    content: "Double-click 'My Projects' on the desktop to see my portfolio of motion design, video editing, and branding work. Or check the Start Menu for quick access.",
    hint: "Look for desktop icons and the Start button (bottom-left).",
    iconEmoji: "🎬",
    action: 'portfolio',
  },
  {
    title: "Discover My Journey",
    icon: User,
    content: "Open 'My Career' to see a visual timeline of 7+ years working with clients like Novo Nordisk, Monoprix, and international festivals.",
    hint: "The Experience window lets you browse my career like a file explorer.",
    iconEmoji: "📋",
    action: 'timeline',
  },
  {
    title: "Creative Tools",
    icon: Palette,
    content: "Try out Paint to doodle, play some music in Winamp, or explore the Adobe suite simulations. This portfolio is your playground!",
    hint: "Right-click the desktop for more options.",
    iconEmoji: "🎨",
  },
  {
    title: "Let's Connect!",
    icon: Mail,
    content: "Interested in working together? Open the Contact window, download my resume, or connect on social media through the Network window.",
    hint: "I'm available for freelance and full-time opportunities.",
    iconEmoji: "✉️",
    action: 'contact',
  },
];

export default function WelcomeWizard({ onClose, onOpenWindow }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const step = WIZARD_STEPS[currentStep];
  const isLast = currentStep === WIZARD_STEPS.length - 1;
  const isFirst = currentStep === 0;

  const handleNext = () => {
    if (isLast) {
      onClose();
      return;
    }
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };

  const handleAction = () => {
    if (step.action && onOpenWindow) {
      onOpenWindow(step.action);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Wizard Dialog */}
      <motion.div
        className="relative bg-[#c0c0c0] border-2 border-white shadow-win-out w-[480px] max-w-[95vw] select-none"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ boxShadow: 'inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, 3px 3px 8px rgba(0,0,0,0.4)' }}
      >
        {/* Title Bar */}
        <div className="px-2 py-1 flex justify-between items-center bg-gradient-to-r from-[#000080] to-[#1084d0] text-white">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#008080] border border-white/30 rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#00ffff] opacity-70 rounded-[1px]" />
            </div>
            <span className="font-sans text-xs font-bold">Welcome to Windows</span>
          </div>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-[#808080] shadow-win-out active:shadow-win-in flex items-center justify-center hover:bg-gray-300"
          >
            <X size={8} strokeWidth={3} className="text-black" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex min-h-[240px]">
          {/* Left Icon Column */}
          <div className="w-[120px] bg-gradient-to-b from-[#000080] via-[#0040a0] to-[#008080] flex flex-col items-center justify-center p-4 shrink-0">
            <motion.div
              key={currentStep}
              className="text-6xl"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {step.iconEmoji}
            </motion.div>
            {/* Step indicators */}
            <div className="flex gap-1.5 mt-6">
              {WIZARD_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentStep ? 'bg-white scale-125' : i < currentStep ? 'bg-cyan-300' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 30 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-bold text-base mb-3 text-gray-900" style={{ fontFamily: "'Pixelify Sans', cursive" }}>
                  {step.title}
                </h2>
                <p className="text-sm text-gray-800 leading-relaxed mb-3">
                  {step.content}
                </p>
                <div className="bg-gray-200 border border-gray-400 shadow-win-in p-2 text-xs text-gray-600 italic">
                  💡 {step.hint}
                </div>
                {step.action && (
                  <button
                    onClick={handleAction}
                    className="mt-3 text-xs text-[#000080] underline hover:text-[#0000ff] cursor-pointer font-bold"
                  >
                    Open {step.title.includes('Work') ? 'Portfolio' : step.title.includes('Journey') ? 'Career Timeline' : 'Contact'} →
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-3 border-t border-gray-400">
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="accent-[#000080]"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem('anoir-wizard-dismissed', 'true');
                } else {
                  localStorage.removeItem('anoir-wizard-dismissed');
                }
              }}
            />
            Don't show again
          </label>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={isFirst}
              className="px-4 py-1 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 min-w-[70px] flex items-center justify-center gap-1"
            >
              <ChevronLeft size={12} /> Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold hover:bg-gray-300 min-w-[70px] flex items-center justify-center gap-1"
            >
              {isLast ? 'Get Started!' : 'Next'} {!isLast && <ChevronRight size={12} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
