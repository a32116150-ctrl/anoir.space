import React, { createContext, useContext, useState } from 'react';

const SystemContext = createContext();

export const useSystem = () => useContext(SystemContext);

export const SystemProvider = ({ children }) => {
  const [clipboard, setClipboard] = useState(null); // { type: 'file'|'folder', data: object, operation: 'copy'|'cut' }
  const [desktopItems, setDesktopItems] = useState([
    { id: 'computer', label: 'My Computer', type: 'system', icon: 'computer' },
    { id: 'trash', label: 'Recycle Bin', type: 'system', icon: 'trash' },
    { id: 'software', label: 'Software I Use', type: 'folder', icon: 'folder', items: [
        { id: 'ae', label: 'Adobe After Effects', type: 'system', icon: 'afterEffects' },
        { id: 'ai', label: 'Adobe Illustrator', type: 'system', icon: 'illustrator' },
        { id: 'ps', label: 'Adobe Photoshop', type: 'system', icon: 'photoshop' },
        { id: 'pr', label: 'Adobe Premiere Pro', type: 'system', icon: 'premiere' },
    ]},
  ]);
  const [trashItems, setTrashItems] = useState([
    { id: 'trash-1', label: 'final.psd', type: 'file', icon: 'file' },
    { id: 'trash-2', label: 'finalpsdfinal.psd', type: 'file', icon: 'file' },
    { id: 'trash-3', label: 'ungreatful client brief.doc', type: 'file', icon: 'file' },
    { id: 'trash-4', label: 'render_v1.mp4', type: 'file', icon: 'file' },
    { id: 'trash-5', label: 'render_v2_fix.mp4', type: 'file', icon: 'file' },
    { id: 'trash-6', label: 'render_final_maybe.mp4', type: 'file', icon: 'file' },
    { id: 'trash-7', label: 'render_final_FINAL.mp4', type: 'file', icon: 'file' },
    { id: 'trash-8', label: 'render_final_FINAL_v2_REAL.mp4', type: 'file', icon: 'file' },
  ]);

  const copyToClipboard = (data, operation = 'copy') => {
    console.log('Copied to clipboard:', data);
    setClipboard({ data, operation });
  };

  const pasteToDesktop = () => {
    if (!clipboard) return;
    
    const newItem = {
      ...clipboard.data,
      id: `desktop-${Date.now()}`,
      label: clipboard.data.company || clipboard.data.label || 'Untitled',
      type: 'file',
      icon: 'file',
      originalData: clipboard.data
    };

    setDesktopItems(prev => [...prev, newItem]);
    
    if (clipboard.operation === 'cut') {
        // In a real FS, we would delete the source. 
        // Here we rely on the source component to handle "cut" visual state or ignore it for cross-app paste.
    }
    setClipboard(null);
  };

  const addToTrash = (id) => {
    const item = desktopItems.find(i => i.id === id);
    if (item) {
        setTrashItems(prev => [...prev, item]);
        setDesktopItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <SystemContext.Provider value={{ 
      clipboard, 
      copyToClipboard, 
      desktopItems, 
      pasteToDesktop, 
      trashItems, 
      addToTrash 
    }}>
      {children}
    </SystemContext.Provider>
  );
};
