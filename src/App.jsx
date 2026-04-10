import React, { useState, useEffect } from 'react';
import Window from './components/Window';
import Toolbar from './components/Toolbar';
import Taskbar from './components/Taskbar';
import MenuBar from './components/MenuBar';
import SystemDialog from './components/SystemDialog';
import DesktopIcon from './components/DesktopIcon';
import { useSystem } from './context/SystemContext';

// Content Components
import AboutWindow from './components/content/AboutWindow';
import ExperienceWindow from './components/content/ExperienceWindow';
import NetworkWindow from './components/content/NetworkWindow';
import ServicesWindow from './components/content/ServicesWindow';
import ContactWindow from './components/content/ContactWindow';
import SettingsWindow, { WALLPAPERS, FONTS } from './components/content/SettingsWindow';
import PaintWindow from './components/content/PaintWindow';
import ComputerWindow from './components/content/ComputerWindow';
import TrashWindow from './components/content/TrashWindow';
import FileViewerWindow from './components/content/FileViewerWindow';
import AfterEffectsWindow from './components/content/AfterEffectsWindow';
import IllustratorWindow from './components/content/IllustratorWindow';
import PhotoshopWindow from './components/content/PhotoshopWindow';
import PremiereWindow from './components/content/PremiereWindow';
import FolderWindow from './components/content/FolderWindow';
import WinampWindow from './components/content/WinampWindow';

import { personalInfo } from './data/content';

const WINDOW_COMPONENTS = {
  about: { title: 'About Me', component: AboutWindow, width: 500 },
  experience: { title: 'Experience', component: ExperienceWindow, width: 600 },
  network: { title: 'Network Connections', component: NetworkWindow, width: 400 },
  services: { title: 'Services Palette', component: ServicesWindow, width: 350 },
  contact: { title: 'Contact Info', component: ContactWindow, width: 400 },
  settings: { title: 'Display Properties', component: SettingsWindow, width: 400 },
  paint: { title: 'untitled - Paint', component: PaintWindow, width: 600 },
  computer: { title: 'My Computer', component: ComputerWindow, width: 600 },
  trash: { title: 'Recycle Bin', component: TrashWindow, width: 500 },
  fileViewer: { title: 'Document Viewer', component: FileViewerWindow, width: 500 },
  ae: { title: 'Adobe After Effects 2024', component: AfterEffectsWindow, width: 800 },
  ai: { title: 'Adobe Illustrator 2024', component: IllustratorWindow, width: 800 },
  ps: { title: 'Adobe Photoshop 2024', component: PhotoshopWindow, width: 800 },
  pr: { title: 'Adobe Premiere Pro 2024', component: PremiereWindow, width: 800 },
  folder: { title: 'Folder', component: FolderWindow, width: 600 },
  winamp: { title: 'Winamp', component: WinampWindow, width: 400 },
};

function App() {
  const { desktopItems, pasteToDesktop, clipboard, addToTrash } = useSystem();
  const [windows, setWindows] = useState([
    { id: 'about', isOpen: true, zIndex: 1 }, // Open About by default
  ]);
  const [activeWindowId, setActiveWindowId] = useState('about');
  const [nextZIndex, setNextZIndex] = useState(2);
  const [isSystemDialogOpen, setIsSystemDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]); // Default to first wallpaper (Clouds)
  const [font, setFont] = useState(FONTS[0]); // Default to Tahoma
  const [showToolbar, setShowToolbar] = useState(true);
  const [showStatusbar, setShowStatusbar] = useState(true);
  const [showColorBox, setShowColorBox] = useState(true);

  // Apply font to body globally to ensure it hits everything including portals/modals
  useEffect(() => {
    document.body.style.fontFamily = font.value;
  }, [font]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openWindow = (id, data = null) => {
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        // Just bring to front and update data if provided
        if (!exists.isOpen) {
            return prev.map(w => w.id === id ? { ...w, isOpen: true, zIndex: nextZIndex, data: data || w.data } : w);
        }
        return prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex, data: data || w.data } : w);
      }
      return [...prev, { id, isOpen: true, zIndex: nextZIndex, data }];
    });
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) {
        setActiveWindowId(null);
    }
  };

  const focusWindow = (id) => {
    if (activeWindowId === id) return;
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const handleStartClick = () => {
    setIsSystemDialogOpen(true);
  };

  const handleSystemDialogYes = () => {
    window.location.href = `mailto:${personalInfo.email}`;
    setIsSystemDialogOpen(false);
  };

  const handleSystemDialogNo = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming this exists or will exist
    link.download = 'Anoir_Cherif_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSystemDialogOpen(false);
  };

  const handleDownloadResume = () => {
    handleSystemDialogNo();
  };

  return (
    <div 
      className="bg-win-gray min-h-screen flex flex-col overflow-hidden relative text-base" 
      style={{ fontFamily: font.value }}
    >
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] z-[9999] opacity-20"></div>

      <MenuBar 
        onOpenWindow={openWindow} 
        onDownloadResume={handleDownloadResume}
        showToolbar={showToolbar}
        onToggleToolbar={() => setShowToolbar(!showToolbar)}
        showStatusbar={showStatusbar}
        onToggleStatusbar={() => setShowStatusbar(!showStatusbar)}
        showColorBox={showColorBox}
        onToggleColorBox={() => setShowColorBox(!showColorBox)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {showToolbar && <Toolbar onOpenWindow={openWindow} showColorBox={showColorBox} />}
        
        {/* Main Canvas */}
        <div 
          className="flex-1 relative overflow-hidden shadow-inner m-2 border-2 border-gray-500 shadow-win-in"
          style={{
            background: wallpaper.type === 'color' ? wallpaper.value : `url(${wallpaper.value})`,
            backgroundColor: wallpaper.color || wallpaper.value, // Fallback/Underlay
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          onContextMenu={(e) => {
            if (e.target === e.currentTarget || e.target.classList.contains('desktop-layer')) {
              e.preventDefault();
              if (clipboard) {
                  if (window.confirm(`Paste '${clipboard.data.company || clipboard.data.label || 'Item'}' to Desktop?`)) {
                      pasteToDesktop();
                  }
              }
            }
          }}
        >
           {/* Desktop Icons Layer */}
           <div className="desktop-layer absolute top-2 left-2 flex flex-col flex-wrap gap-2 h-full w-full content-start z-0 pointer-events-auto">
              {desktopItems.map(item => (
                  <DesktopIcon 
                    key={item.id} 
                    item={item} 
                    onDoubleClick={(item) => {
                      if (item.type === 'system') {
                          openWindow(item.id);
                      } else if (item.type === 'folder') {
                          openWindow('folder', { title: item.label, items: item.items });
                      } else {
                          alert(`File: ${item.label}`);
                      }
                  }}
                    onContextMenu={(e, item) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (item.type !== 'system') {
                             if (window.confirm(`Move '${item.label}' to Recycle Bin?`)) {
                                 addToTrash(item.id);
                             }
                        }
                    }}
                  />
              ))}
           </div>

           {/* Windows Layer */}
           {windows.map((win) => {
             const config = WINDOW_COMPONENTS[win.id];
             if (!config) return null;
             const Content = config.component;
             
             // Allow dynamic title for file viewer
             const title = win.data?.title || config.title;

             return (
               <Window
                 key={win.id}
                 id={win.id}
                 title={title}
                 isOpen={win.isOpen}
                 onClose={() => closeWindow(win.id)}
                 isActive={activeWindowId === win.id}
                 onFocus={() => focusWindow(win.id)}
                 zIndex={win.zIndex}
                 isMobile={isMobile}
               >
                 <Content 
                    currentWallpaper={wallpaper} 
                    onWallpaperChange={setWallpaper}
                    currentFont={font}
                    onFontChange={setFont}
                    onOpenWindow={openWindow}
                    data={win.data}
                 />
               </Window>
             );
           })}
        </div>
      </div>

      {showStatusbar && (
      <Taskbar 
        openWindows={windows.filter(w => w.isOpen).map(w => ({ id: w.id, title: WINDOW_COMPONENTS[w.id]?.title }))}
        activeWindowId={activeWindowId}
        onWindowClick={focusWindow}
        onStartClick={handleStartClick}
      />
      )}

      <SystemDialog 
        isOpen={isSystemDialogOpen}
        onClose={() => setIsSystemDialogOpen(false)}
        onYes={handleSystemDialogYes}
        onNo={handleSystemDialogNo}
      />
    </div>
  );
}

export default App;
