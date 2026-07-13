import React, { createContext, useContext, useState, useCallback } from 'react';

const SystemContext = createContext();

export const useSystem = () => useContext(SystemContext);

export const SystemProvider = ({ children }) => {
  const [clipboard, setClipboard] = useState(null);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [desktopItems, setDesktopItems] = useState([
    { id: 'about', label: 'About Me', type: 'system', icon: 'about' },
    { id: 'portfolio', label: 'My Projects', type: 'system', icon: 'portfolio' },
    { id: 'videoLibrary', label: 'Video Work', type: 'system', icon: 'videoLibrary' },
    { id: 'timeline', label: 'My Career', type: 'system', icon: 'timeline' },
    { id: 'skills', label: 'System Info', type: 'system', icon: 'skills' },
    { id: 'process', label: 'How I Work', type: 'system', icon: 'process' },
    { id: 'experience', label: 'Experience', type: 'system', icon: 'experience' },
    { id: 'services', label: 'Services', type: 'system', icon: 'services' },
    { id: 'paint', label: 'Paint', type: 'system', icon: 'paint' },
    { id: 'contact', label: 'Contact', type: 'system', icon: 'contact' },
    { id: 'settings', label: 'Display Properties', type: 'system', icon: 'settings' },
    { id: 'computer', label: 'My Computer', type: 'system', icon: 'computer' },
    { id: 'network', label: 'Network Connections', type: 'system', icon: 'network' },
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
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  const copyToClipboard = useCallback((data, operation = 'copy') => {
    setClipboard({ data, operation });
  }, []);

  const pasteToDesktop = useCallback(() => {
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
      setTrashItems(prev => [...prev, { id: `trash-${Date.now()}`, label: clipboard.data.label || 'Untitled', type: 'file', icon: 'file' }]);
    }
    setClipboard(null);
  }, [clipboard]);

  const addToTrash = useCallback((id) => {
    const item = desktopItems.find(i => i.id === id);
    if (item) {
      setTrashItems(prev => [...prev, item]);
      setDesktopItems(prev => prev.filter(i => i.id !== id));
    }
  }, [desktopItems]);

  const selectIcon = useCallback((id) => {
    setSelectedIconId(id);
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedIconId(null);
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen(prev => !prev);
  }, []);

  const closeStartMenu = useCallback(() => {
    setStartMenuOpen(false);
  }, []);

  const openContextMenu = useCallback((x, y, items, targetId) => {
    setContextMenu({ x, y, items, targetId });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const minimizeWindow = useCallback((id) => {
    setMinimizedWindows(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const restoreWindow = useCallback((id) => {
    setMinimizedWindows(prev => prev.filter(w => w !== id));
  }, []);

  const emptyTrash = useCallback(() => {
    setTrashItems([]);
  }, []);

  return (
    <SystemContext.Provider value={{
      clipboard,
      copyToClipboard,
      desktopItems,
      setDesktopItems,
      pasteToDesktop,
      trashItems,
      addToTrash,
      selectedIconId,
      selectIcon,
      deselectAll,
      startMenuOpen,
      toggleStartMenu,
      closeStartMenu,
      contextMenu,
      openContextMenu,
      closeContextMenu,
      minimizedWindows,
      minimizeWindow,
      restoreWindow,
      emptyTrash,
    }}>
      {children}
    </SystemContext.Provider>
  );
};
