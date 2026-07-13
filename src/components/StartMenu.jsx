import React, { useState } from 'react';
import { Monitor, Folder, Settings, Search, HelpCircle, Terminal, Power, User, Briefcase, Palette, Share2, Mail, Trash2, Star, Layers, Clock, MessageSquare, ChevronRight, Zap, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StartMenu({ onOpenWindow, onDownloadResume, onClose, isOpen }) {
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);

  const programItems = [
    { label: 'About Me', icon: User, action: () => onOpenWindow('about') },
    { label: 'My Projects', icon: Briefcase, action: () => onOpenWindow('portfolio'), highlight: true },
    { label: 'My Career', icon: Clock, action: () => onOpenWindow('timeline'), highlight: true },
    { label: 'Skills & Tools', icon: Layers, action: () => onOpenWindow('skills') },
    { label: 'Experience', icon: Folder, action: () => onOpenWindow('experience') },
    { label: 'Services', icon: Star, action: () => onOpenWindow('services') },
    { label: 'Get a Quote', icon: Calculator, action: () => onOpenWindow('quoteEstimator'), highlight: true },
    { label: 'Testimonials', icon: MessageSquare, action: () => onOpenWindow('testimonials') },
    { label: 'How I Work', icon: Zap, action: () => onOpenWindow('process') },
    { label: 'Paint', icon: Palette, action: () => onOpenWindow('paint') },
    { label: 'Network', icon: Share2, action: () => onOpenWindow('network') },
    { label: 'Contact', icon: Mail, action: () => onOpenWindow('contact') },
    { label: 'My Computer', icon: Monitor, action: () => onOpenWindow('computer') },
    { label: 'Recycle Bin', icon: Trash2, action: () => onOpenWindow('trash') },
  ];

  const documentItems = [
    { label: 'Download Resume', icon: Folder, action: () => { onDownloadResume(); onClose(); } },
  ];

  const settingsItems = [
    { label: 'Display Properties', icon: Settings, action: () => { onOpenWindow('settings'); onClose(); } },
  ];

  const bottomItems = [
    { label: 'Find', icon: Search, action: () => {}, disabled: true },
    { label: 'Help', icon: HelpCircle, action: () => onOpenWindow('about') },
    { label: 'Run...', icon: Terminal, action: () => {}, disabled: true },
    { label: 'Shut Down...', icon: Power, action: () => {
      // Fun shutdown screen
      document.body.style.transition = 'opacity 1s';
      document.body.style.opacity = '0';
      setTimeout(() => {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ff8c00;font-family:Pixelify Sans,monospace;font-size:24px;text-align:center;"><div><p>It\'s now safe to turn off<br/>your computer.</p><p style="font-size:12px;color:#666;margin-top:20px;">(Just kidding — refresh to come back! 🎨)</p></div></div>';
        document.body.style.opacity = '1';
      }, 1000);
    }},
  ];

  const submenus = {
    programs: programItems,
    documents: documentItems,
    settings: settingsItems,
  };

  const mainMenuItems = [
    { key: 'programs', label: 'Programs', icon: Folder, hasSubmenu: true },
    { key: 'documents', label: 'Documents', icon: Folder, hasSubmenu: true },
    { key: 'settings', label: 'Settings', icon: Settings, hasSubmenu: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="fixed bottom-12 left-0 z-[150] select-none"
            style={{ fontFamily: "'Pixelify Sans', cursive" }}
          >
            <div className="bg-win-gray border-2 border-win-gray-light shadow-win-out flex" style={{ width: '220px' }}>
              <div className="w-8 bg-gradient-to-b from-[#000080] to-[#8080ff] flex flex-col items-center py-2">
                <span className="text-white text-[10px] font-bold [writing-mode:vertical-rl] rotate-180 tracking-wider">Windows</span>
                <span className="text-white text-[8px] font-bold [writing-mode:vertical-rl] rotate-180 mt-2">95</span>
              </div>
              <div className="flex-1 py-1">
                {/* Main Menu Items with Submenus */}
                {mainMenuItems.map((item) => (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setHoveredSubmenu(item.key)}
                    onMouseLeave={() => setHoveredSubmenu(null)}
                  >
                    <button
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-win-blue hover:text-white group justify-between transition-colors duration-75"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={18} className="shrink-0" />
                        <span className="font-sans font-bold text-xs">{item.label}</span>
                      </div>
                      <ChevronRight size={12} className="opacity-50" />
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {hoveredSubmenu === item.key && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.1 }}
                          className="absolute left-0 bottom-full w-[200px] bg-win-gray border-2 border-win-gray-light shadow-win-out py-1 z-[160] md:left-full md:bottom-0"
                          onMouseEnter={() => setHoveredSubmenu(item.key)}
                          onMouseLeave={() => setHoveredSubmenu(null)}
                        >
                          {submenus[item.key].map((subItem, i) => (
                            <button
                              key={i}
                              onClick={() => { subItem.action(); onClose(); }}
                              disabled={subItem.disabled}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-win-blue hover:text-white group disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors duration-75 ${
                                subItem.highlight ? 'font-extrabold' : ''
                              }`}
                            >
                              <subItem.icon size={16} className="shrink-0" />
                              <span className="font-sans font-bold text-xs">{subItem.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="border-t border-gray-400 my-1 mx-2"></div>

                {/* Bottom Section */}
                {bottomItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { item.action(); onClose(); }}
                    disabled={item.disabled}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-win-blue hover:text-white group disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors duration-75"
                  >
                    <item.icon size={18} className="shrink-0" />
                    <span className="font-sans font-bold text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="fixed inset-0 z-[149]" onClick={onClose} />
        </>
      )}
    </AnimatePresence>
  );
}
