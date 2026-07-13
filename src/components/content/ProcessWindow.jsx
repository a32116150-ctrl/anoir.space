import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Search, PenTool, Play, CheckCircle, Send } from 'lucide-react';

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Discovery & Brief",
    icon: Search,
    description: "We start by understanding your vision, goals, target audience, and project scope. I'll ask the right questions to ensure we're aligned from day one.",
    deliverables: ["Project brief document", "Timeline & milestones", "Budget estimate"],
    duration: "1-2 days",
    color: "#0066cc",
  },
  {
    id: 2,
    title: "Concept & Storyboard",
    icon: PenTool,
    description: "I develop creative concepts, mood boards, and storyboards that bring the vision to life on paper before any pixel is moved.",
    deliverables: ["Mood board", "Storyboard / wireframes", "Concept presentation"],
    duration: "2-5 days",
    color: "#8338ec",
  },
  {
    id: 3,
    title: "Design & Animation",
    icon: Play,
    description: "This is where the magic happens. I craft the visuals, motion graphics, and animations with meticulous attention to detail and brand consistency.",
    deliverables: ["Draft renders", "Animation sequences", "Design files"],
    duration: "5-15 days",
    color: "#ff6b35",
  },
  {
    id: 4,
    title: "Review & Revisions",
    icon: CheckCircle,
    description: "You review the work and I refine based on your feedback. I typically include 2-3 rounds of revisions to get everything perfect.",
    deliverables: ["Revised drafts", "Change log", "2-3 revision rounds included"],
    duration: "2-4 days",
    color: "#06d6a0",
  },
  {
    id: 5,
    title: "Final Delivery",
    icon: Send,
    description: "Polished, production-ready files delivered in your preferred formats. I provide organized source files and a handoff document.",
    deliverables: ["Final renders (all formats)", "Source files", "Usage guidelines"],
    duration: "1-2 days",
    color: "#e63946",
  },
];

export default function ProcessWindow() {
  const [activeStep, setActiveStep] = useState(0);
  const step = PROCESS_STEPS[activeStep];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Progress Bar */}
      <div className="shrink-0 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-gray-800">🧙‍♂️ Creative Process Wizard</span>
          <span className="text-[10px] text-gray-500 font-mono">Step {activeStep + 1} of {PROCESS_STEPS.length}</span>
        </div>
        <div className="h-5 bg-white border-2 border-gray-500 shadow-win-in overflow-hidden flex">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.id}
              className="h-full cursor-pointer relative"
              style={{
                width: `${100 / PROCESS_STEPS.length}%`,
                background: i <= activeStep
                  ? `repeating-linear-gradient(90deg, ${s.color} 0px, ${s.color} 6px, ${s.color}cc 6px, ${s.color}cc 8px)`
                  : '#e5e5e5',
              }}
              onClick={() => setActiveStep(i)}
              initial={false}
              animate={{ opacity: i <= activeStep ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-14 h-14 flex items-center justify-center text-white shrink-0 border-2 border-gray-500 shadow-win-out"
                style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}aa)` }}
              >
                <step.icon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">{step.title}</h3>
                <span className="text-[10px] text-gray-500 font-mono bg-gray-100 border border-gray-300 px-1.5 py-0.5">
                  ⏱ Typical duration: {step.duration}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border-2 border-gray-400 p-3 shadow-win-in mb-3">
              <p className="text-sm text-gray-800 leading-relaxed">{step.description}</p>
            </div>

            {/* Deliverables */}
            <fieldset className="border border-white shadow-win-in p-3">
              <legend className="text-xs px-1 font-bold">📦 What You'll Receive</legend>
              <ul className="space-y-1.5">
                {step.deliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle size={12} className="text-green-600 shrink-0" />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </fieldset>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-300 shrink-0 mt-2">
        <div className="flex gap-1">
          {PROCESS_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-4 h-4 border text-[9px] font-bold flex items-center justify-center ${
                i === activeStep
                  ? 'bg-[#000080] text-white border-[#000080]'
                  : 'bg-white border-gray-400 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-3 py-1 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold disabled:opacity-40 hover:bg-gray-300 flex items-center gap-1"
          >
            <ChevronLeft size={12} /> Back
          </button>
          <button
            onClick={() => setActiveStep(prev => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
            disabled={activeStep === PROCESS_STEPS.length - 1}
            className="px-3 py-1 bg-[#c0c0c0] border-t border-l border-white border-b-black border-r-black shadow-win-out active:shadow-win-in text-xs font-bold disabled:opacity-40 hover:bg-gray-300 flex items-center gap-1"
          >
            Next <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
