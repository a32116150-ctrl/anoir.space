import React, { useState } from 'react';

export default function MenuBar({ onOpenWindow, onDownloadResume, showStatusbar, onToggleStatusbar }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = [
    { 
      label: 'File', 
      items: [
        { label: 'Open Resume', action: () => onDownloadResume() },
        { label: 'Exit', action: () => window.close() } // Won't work in browser usually but fits theme
      ] 
    },
    { 
      label: 'Edit', 
      items: [
        { label: 'Undo', disabled: true },
        { label: 'Repeat', disabled: true },
        { label: 'Cut', disabled: true },
        { label: 'Copy', disabled: true },
      ] 
    },
    { 
      label: 'View',
      items: [
        { label: 'Status Bar', checked: showStatusbar, action: onToggleStatusbar },
      ] 
    },
    { 
      label: 'Help', 
      items: [
        { label: 'About Paint', action: () => onOpenWindow('about') },
        { label: 'Contact Support', action: () => onOpenWindow('contact') }
      ] 
    },
  ];

  return (
    <div className="h-7 bg-win-gray flex items-center px-2 select-none border-b border-white shadow-md relative z-50">
      {menus.map((menu) => (
        <div 
          key={menu.label} 
          className="relative"
          onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
        >
          <button
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            className={`px-3 py-1 text-sm font-sans focus:outline-none ${activeMenu === menu.label ? 'bg-win-blue text-white' : 'hover:bg-win-gray-light text-black'}`}
          >
            <span className="first-letter:underline">{menu.label.charAt(0)}</span>{menu.label.slice(1)}
          </button>
          
          {activeMenu === menu.label && (
            <div className="absolute left-0 top-full bg-win-gray border-2 border-win-gray-light shadow-win-out min-w-[150px] flex flex-col z-50">
              {menu.items.map((item, idx) => (
                <button
                  key={idx}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.action) item.action();
                    setActiveMenu(null);
                  }}
                  className={`px-4 py-1 text-left text-sm hover:bg-win-blue hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500 flex justify-between group`}
                >
                  <span>{item.label}</span>
                  {item.checked && <span className="ml-2">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {/* Click outside to close - Overlay */}
      {activeMenu && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setActiveMenu(null)}></div>
      )}
    </div>
  );
}
