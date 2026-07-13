import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: "ANOIR BIOS v7.0 — Creative Systems Inc.", delay: 0 },
  { text: "Copyright (C) 2018-2025 Anoir Cherif", delay: 120 },
  { text: "", delay: 240 },
  { text: "Checking creative processors... OK", delay: 360 },
  { text: "Loading 7+ years of motion design experience...", delay: 540 },
  { text: "Initializing Adobe Suite drivers.......... OK", delay: 720 },
  { text: "  > After Effects ████████████████████ 95%", delay: 900 },
  { text: "  > Premiere Pro  ██████████████████░░ 90%", delay: 1020 },
  { text: "  > Photoshop     █████████████████░░░ 88%", delay: 1140 },
  { text: "  > Illustrator   ████████████████░░░░ 85%", delay: 1260 },
  { text: "Mounting 50+ completed projects... OK", delay: 1440 },
  { text: "Loading 20+ satisfied clients... OK", delay: 1620 },
  { text: "Detecting network: Tunisia → Worldwide... CONNECTED", delay: 1800 },
  { text: "", delay: 1920 },
  { text: "All systems ready. Starting portfolio...", delay: 2000 },
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [phase, setPhase] = useState('bios'); // bios, logo, done
  const [skipVisible, setSkipVisible] = useState(false);

  useEffect(() => {
    // Show skip hint after 1 second
    const skipTimer = setTimeout(() => setSkipVisible(true), 1000);

    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text]);
      }, line.delay);
    });

    // Transition to logo phase
    const logoTimer = setTimeout(() => {
      setPhase('logo');
    }, 2200);

    // Complete boot
    const completeTimer = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 600);
    }, 3400);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('done');
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: '#000' }}
        >
          {phase === 'bios' && (
            <motion.div
              className="w-full h-full p-6 md:p-12 font-mono text-sm overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* CRT Screen effect */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.15) 50%), linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.02), rgba(0,0,255,0.03))',
                  backgroundSize: '100% 3px, 4px 100%',
                }}
              />

              <div className="relative z-10">
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={`leading-6 ${
                      line.includes('OK') || line.includes('CONNECTED')
                        ? 'text-green-400'
                        : line.includes('████')
                        ? 'text-cyan-400'
                        : line.includes('Starting')
                        ? 'text-yellow-400 font-bold'
                        : 'text-gray-300'
                    }`}
                  >
                    {line || '\u00A0'}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-2 h-4 bg-gray-300 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                />
              </div>
            </motion.div>
          )}

          {phase === 'logo' && (
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Windows 95 style logo */}
              <div className="flex gap-1">
                <motion.div
                  className="w-10 h-10 bg-red-500"
                  initial={{ x: -20, y: -20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0, duration: 0.4 }}
                />
                <motion.div
                  className="w-10 h-10 bg-green-500"
                  initial={{ x: 20, y: -20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                />
              </div>
              <div className="flex gap-1 -mt-5">
                <motion.div
                  className="w-10 h-10 bg-blue-500"
                  initial={{ x: -20, y: 20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
                <motion.div
                  className="w-10 h-10 bg-yellow-500"
                  initial={{ x: 20, y: 20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
              </div>

              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h1 className="text-white text-2xl font-bold tracking-wider" style={{ fontFamily: "'Pixelify Sans', cursive" }}>
                  Anoir Cherif
                </h1>
                <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'Pixelify Sans', cursive" }}>
                  Visual Creator & Motion Designer
                </p>
              </motion.div>

              {/* Loading bar */}
              <motion.div
                className="w-64 h-5 border-2 border-gray-600 bg-gray-900 mt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="h-full"
                  style={{
                    background: 'repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #0000b0 8px, #0000b0 16px)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.7, duration: 1, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Skip button */}
          {skipVisible && phase !== 'done' && (
            <motion.button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 text-gray-600 hover:text-gray-400 text-xs font-mono transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Press to skip →
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
