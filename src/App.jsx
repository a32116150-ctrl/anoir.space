import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import SystemDialog from './components/SystemDialog';
import DesktopIcon from './components/DesktopIcon';
import StartMenu from './components/StartMenu';
import ContextMenu from './components/ContextMenu';
import BootScreen from './components/content/BootScreen';
import WelcomeWizard from './components/WelcomeWizard';
import ErrorBoundary from './components/ErrorBoundary';
import Clippy from './components/Clippy';
import { useSystem } from './context/SystemContext';
import { WALLPAPERS, FONTS } from './data/settings';
import { useHolidayTheme } from './hooks/useHolidayTheme';
import { useSeasonalTheme } from './hooks/useSeasonalTheme';
import SeasonalEffect from './components/effects/SeasonalEffect';

// Eagerly loaded (needed immediately after boot)
import AboutWindow from './components/content/AboutWindow';

// Lazy loaded content windows (code splitting)
const ExperienceWindow = lazy(() => import('./components/content/ExperienceWindow'));
const NetworkWindow = lazy(() => import('./components/content/NetworkWindow'));
const ServicesWindow = lazy(() => import('./components/content/ServicesWindow'));
const ContactWindow = lazy(() => import('./components/content/ContactWindow'));
const SettingsWindow = lazy(() => import('./components/content/SettingsWindow'));
const PaintWindow = lazy(() => import('./components/content/PaintWindow'));
const ComputerWindow = lazy(() => import('./components/content/ComputerWindow'));
const TrashWindow = lazy(() => import('./components/content/TrashWindow'));
const FileViewerWindow = lazy(() => import('./components/content/FileViewerWindow'));
const AfterEffectsWindow = lazy(() => import('./components/content/AfterEffectsWindow'));
const IllustratorWindow = lazy(() => import('./components/content/IllustratorWindow'));
const PhotoshopWindow = lazy(() => import('./components/content/PhotoshopWindow'));
const PremiereWindow = lazy(() => import('./components/content/PremiereWindow'));
const FolderWindow = lazy(() => import('./components/content/FolderWindow'));
const WinampWindow = lazy(() => import('./components/content/WinampWindow'));
const TimelineWindow = lazy(() => import('./components/content/TimelineWindow'));
const PortfolioWindow = lazy(() => import('./components/content/PortfolioWindow'));
const VideoLibraryWindow = lazy(() => import('./components/content/VideoLibraryWindow'));
const SkillsWindow = lazy(() => import('./components/content/SkillsWindow'));
const TestimonialsWindow = lazy(() => import('./components/content/TestimonialsWindow'));
const ProcessWindow = lazy(() => import('./components/content/ProcessWindow'));
const QuoteEstimatorWindow = lazy(() => import('./components/content/QuoteEstimatorWindow'));

import { personalInfo } from './data/content';
import { Trash2, Folder } from 'lucide-react';

const WINDOW_COMPONENTS = {
  about: { title: 'About Me — Anoir Cherif', component: AboutWindow, width: 720, height: 560 },
  experience: { title: 'Experience', component: ExperienceWindow, width: 760, height: 600 },
  network: { title: 'Network Connections', component: NetworkWindow, width: 600, height: 450 },
  services: { title: 'Services — Anoir Cherif', component: ServicesWindow, width: 600, height: 560 },
  contact: { title: 'Contact — Anoir Cherif', component: ContactWindow, width: 640, height: 600 },
  settings: { title: 'Display Properties', component: SettingsWindow, width: 560, height: 520 },
  paint: { title: 'untitled - Paint', component: PaintWindow, width: 800, height: 600 },
  computer: { title: 'My Computer', component: ComputerWindow, width: 800, height: 560 },
  trash: { title: 'Recycle Bin', component: TrashWindow, width: 700, height: 500 },
  fileViewer: { title: 'Document Viewer', component: FileViewerWindow, width: 700, height: 700 },
  ae: { title: 'Adobe After Effects 2024', component: AfterEffectsWindow, width: 1000, height: 700 },
  ai: { title: 'Adobe Illustrator 2024', component: IllustratorWindow, width: 1000, height: 700 },
  ps: { title: 'Adobe Photoshop 2024', component: PhotoshopWindow, width: 1000, height: 700 },
  pr: { title: 'Adobe Premiere Pro 2024', component: PremiereWindow, width: 1000, height: 700 },
  folder: { title: 'Folder', component: FolderWindow, width: 800, height: 560 },
  winamp: { title: 'Winamp', component: WinampWindow, width: 500, height: 350 },
  timeline: { title: 'My Career — Timeline', component: TimelineWindow, width: 800, height: 650 },
  portfolio: { title: 'My Projects — Portfolio', component: PortfolioWindow, width: 1000, height: 700 },
  videoLibrary: { title: 'Video Work — Library', component: VideoLibraryWindow, width: 1000, height: 700 },
  skills: { title: 'System Information', component: SkillsWindow, width: 720, height: 600 },
  testimonials: { title: 'Testimonials — Notepad', component: TestimonialsWindow, width: 640, height: 450 },
  process: { title: 'How I Work — Creative Process', component: ProcessWindow, width: 700, height: 600 },
  quoteEstimator: { title: 'Instant Quote Estimator', component: QuoteEstimatorWindow, width: 560, height: 620 },
};

function App() {
  const {
    desktopItems, pasteToDesktop, clipboard, addToTrash,
    deselectAll,
    startMenuOpen, toggleStartMenu, closeStartMenu,
    contextMenu, openContextMenu, closeContextMenu,
    minimizedWindows, restoreWindow
  } = useSystem();

  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(2);
  const [isSystemDialogOpen, setIsSystemDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[0]);
  const [font, setFont] = useState(FONTS[0]);
  const [showStatusbar, setShowStatusbar] = useState(true);

  // Holiday theme
  const { enabled: holidayEnabled, toggleEnabled: toggleHoliday, activeHoliday, shouldApply: holidayActive } = useHolidayTheme();

  // Seasonal theme
  const { enabled: seasonalEnabled, toggleEnabled: toggleSeasonal, activeSeason, shouldApply: seasonalActive } = useSeasonalTheme();

  // Use holiday wallpaper when active, then seasonal, otherwise user's choice
  const effectiveWallpaper = 
    holidayActive && activeHoliday ? activeHoliday.wallpaper :
    seasonalActive && activeSeason ? activeSeason.wallpaper :
    wallpaper;

  // Boot & Welcome states
  const [isBooting, setIsBooting] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    document.body.style.fontFamily = font.value;
  }, [font]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle boot completion
  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
    setHasBooted(true);

    // Open the About window after boot
    setWindows([{ id: 'about', isOpen: true, zIndex: 1 }]);
    setActiveWindowId('about');

    // Check if wizard should be shown
    const wizardDismissed = localStorage.getItem('anoir-wizard-dismissed');
    if (!wizardDismissed) {
      // Show wizard after a short delay
      setTimeout(() => setShowWizard(true), 800);
    }
  }, []);

  // Check if user has visited before (skip boot for returning visitors)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('anoir-has-visited');
    if (hasVisited) {
      setIsBooting(false);
      setHasBooted(true);
      setWindows([{ id: 'about', isOpen: true, zIndex: 1 }]);
      setActiveWindowId('about');
    }
  }, []);

  // Mark as visited after boot
  useEffect(() => {
    if (hasBooted) {
      sessionStorage.setItem('anoir-has-visited', 'true');
    }
  }, [hasBooted]);

  const openWindow = useCallback((id, data = null) => {
    restoreWindow(id);
    const currentZ = nextZIndex;
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        if (!exists.isOpen) {
          return prev.map(w => w.id === id ? { ...w, isOpen: true, zIndex: currentZ, data: data || w.data } : w);
        }
        return prev.map(w => w.id === id ? { ...w, zIndex: currentZ, data: data || w.data } : w);
      }
      return [...prev, { id, isOpen: true, zIndex: currentZ, data }];
    });
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [nextZIndex, restoreWindow]);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const focusWindow = useCallback((id) => {
    if (activeWindowId === id) return;
    const currentZ = nextZIndex;
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, zIndex: currentZ } : w));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [activeWindowId, nextZIndex]);

  // Keyboard shortcuts (must be after closeWindow/focusWindow declarations)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeWindowId) {
        closeWindow(activeWindowId);
        return;
      }
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const openWins = windows.filter(w => w.isOpen);
        if (openWins.length <= 1) return;
        const currentIdx = openWins.findIndex(w => w.id === activeWindowId);
        const nextIdx = (currentIdx + 1) % openWins.length;
        focusWindow(openWins[nextIdx].id);
        restoreWindow(openWins[nextIdx].id);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, windows, closeWindow, focusWindow, restoreWindow]);

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const handleKonami = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0;
          const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
          for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `position:fixed;width:8px;height:8px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;top:-10px;z-index:10000;pointer-events:none;animation:confetti-fall ${1 + Math.random() * 2}s ease-out forwards;`;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
          }
        }
      } else {
        konamiIndex = 0;
      }
    };
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, []);

  const handleStartClick = useCallback(() => {
    toggleStartMenu();
  }, [toggleStartMenu]);

  const handleSystemDialogYes = useCallback(() => {
    window.location.href = `mailto:${personalInfo.email}`;
    setIsSystemDialogOpen(false);
  }, []);

  const handleSystemDialogNo = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anoir_Cherif_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSystemDialogOpen(false);
  }, []);

  const handleDownloadResume = useCallback(() => {
    handleSystemDialogNo();
  }, [handleSystemDialogNo]);

  const handleDesktopContextMenu = useCallback((e) => {
    e.preventDefault();
    const items = [
      { label: 'Arrange Icons', disabled: true },
      { label: 'Line up Icons', action: () => {} },
      { separator: true },
      { label: 'Paste', disabled: !clipboard, action: () => { pasteToDesktop(); }, icon: <Folder size={12} /> },
      { label: 'New', disabled: true },
      { separator: true },
      { label: 'Properties', disabled: true },
    ];
    openContextMenu(e.clientX, e.clientY, items, null);
  }, [clipboard, pasteToDesktop, openContextMenu]);

  const handleIconContextMenu = useCallback((e, item) => {
    const items = [
      { label: 'Open', action: () => {
        if (item.type === 'folder') openWindow('folder', { title: item.label, items: item.items });
        else openWindow(item.id);
      }, icon: <Folder size={12} /> },
      { separator: true },
      { label: 'Send to', disabled: true },
      { label: 'Cut', disabled: true },
      { label: 'Copy', disabled: true },
      { separator: true },
      { label: 'Delete', action: () => addToTrash(item.id), icon: <Trash2 size={12} /> },
      { label: 'Rename', disabled: true },
      { separator: true },
      { label: 'Properties', disabled: true },
    ];
    openContextMenu(e.clientX, e.clientY, items, item.id);
  }, [openContextMenu, openWindow, addToTrash]);

  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('desktop-layer')) {
      deselectAll();
    }
  }, [deselectAll]);

  // Cursor trail effect (desktop only)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;
    let lastTime = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 40) return;
      lastTime = now;
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = `${e.clientX - 3}px`;
      dot.style.top = `${e.clientY - 3}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 400);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show boot screen
  if (isBooting) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <div
      className="bg-win-gray h-[100dvh] flex flex-col overflow-hidden relative text-base crt-effect"
      style={{ fontFamily: font.value }}
    >
      {/* Seasonal Particle Effect */}
      {seasonalActive && activeSeason && (
        <SeasonalEffect season={activeSeason} />
      )}

      {/* Scanline Effect */}
      <div className="scanline-overlay absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,6px_100%] z-[9999] opacity-20"></div>

      {/* Boot Message */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[1] text-white/30 text-[10px] font-mono pointer-events-none select-none">
        Starting Windows 95...
      </div>

      <div className="flex-1 flex overflow-hidden relative">

        {/* Main Canvas */}
        <div
          className="flex-1 relative overflow-hidden shadow-inner m-1 border-2 border-[#808080]"
          style={{
            background: effectiveWallpaper.type === 'color' ? effectiveWallpaper.value : `url(${effectiveWallpaper.value})`,
            backgroundColor: effectiveWallpaper.color || effectiveWallpaper.value,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          onContextMenu={handleDesktopContextMenu}
          onClick={handleDesktopClick}
        >
          {/* Desktop Icons Layer */}
          <div className="desktop-layer absolute top-2 left-2 right-2 bottom-16 flex flex-col flex-wrap gap-2 content-start z-0 pointer-events-auto overflow-auto">
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
                onContextMenu={handleIconContextMenu}
              />
            ))}
          </div>

          {/* Windows Layer */}
          <AnimatePresence>
            {windows.map((win) => {
              if (minimizedWindows.includes(win.id)) return null;
              const config = WINDOW_COMPONENTS[win.id];
              if (!config) return null;
              const Content = config.component;
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
                  initialWidth={config.width}
                  initialHeight={config.height}
                >
                  <ErrorBoundary>
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-full gap-2 text-sm text-gray-500">
                        <motion.div
                          className="w-4 h-4 border-2 border-[#000080] border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Loading...
                      </div>
                    }>
                      <Content
                        currentWallpaper={wallpaper}
                        onWallpaperChange={setWallpaper}
                        currentFont={font}
                        onFontChange={setFont}
                        onOpenWindow={openWindow}
                        data={win.data}
                        holidayEnabled={holidayEnabled}
                        onToggleHoliday={toggleHoliday}
                        activeHoliday={activeHoliday}
                        seasonalEnabled={seasonalEnabled}
                        onToggleSeasonal={toggleSeasonal}
                        activeSeason={activeSeason}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </Window>
              );
            })}
          </AnimatePresence>
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

      {/* Start Menu */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={closeStartMenu}
        onOpenWindow={openWindow}
        onDownloadResume={handleDownloadResume}
      />

      {/* Context Menu */}
      <ContextMenu menu={contextMenu} onClose={closeContextMenu} />

      {/* Welcome Wizard */}
      <AnimatePresence>
        {showWizard && (
          <WelcomeWizard
            onClose={() => setShowWizard(false)}
            onOpenWindow={openWindow}
          />
        )}
      </AnimatePresence>

      {/* Clippy Assistant */}
      {hasBooted && <Clippy />}

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
