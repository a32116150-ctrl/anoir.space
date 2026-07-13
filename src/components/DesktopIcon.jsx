import React, { useState, useCallback } from 'react';
import { Monitor, Trash2, FileText, HardDrive, Disc, Folder, Globe, User, Briefcase, Clock, Cpu, Film, PaintBucket, Phone, Settings, Zap } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const DesktopIcon = ({ item, onDoubleClick, onContextMenu, variant = 'desktop' }) => {
  const { selectedIconId, selectIcon, deselectAll } = useSystem();
  const isSelected = selectedIconId === item.id;
  const [isFlashing, setIsFlashing] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  let Icon = FileText;
  if (item.icon === 'computer') Icon = Monitor;
  if (item.icon === 'trash') Icon = Trash2;
  if (item.icon === 'disk') Icon = HardDrive;
  if (item.icon === 'cd') Icon = Disc;
  if (item.icon === 'folder') Icon = Folder;
  if (item.icon === 'network') Icon = Globe;
  if (item.icon === 'about') Icon = User;
  if (item.icon === 'portfolio') Icon = Briefcase;
  if (item.icon === 'timeline') Icon = Clock;
  if (item.icon === 'skills') Icon = Cpu;
  if (item.icon === 'videoLibrary') Icon = Film;
  if (item.icon === 'experience') Icon = Briefcase;
  if (item.icon === 'services') Icon = PaintBucket;
  if (item.icon === 'paint') Icon = PaintBucket;
  if (item.icon === 'contact') Icon = Phone;
  if (item.icon === 'settings') Icon = Settings;
  if (item.icon === 'process') Icon = Zap;

  const isDesktop = variant === 'desktop';

  const appStyles = {
    afterEffects: { bg: '#00005b', textCol: '#d2d2ff', border: '#9999ff', label: 'Ae' },
    illustrator: { bg: '#330000', textCol: '#ff9900', border: '#ff9900', label: 'Ai' },
    photoshop: { bg: '#001e36', textCol: '#31a8ff', border: '#31a8ff', label: 'Ps' },
    premiere: { bg: '#2a003e', textCol: '#d29bfd', border: '#d29bfd', label: 'Pr' },
  };

  const handleClick = useCallback((e) => {
    if (e.shiftKey) return;
    selectIcon(item.id);
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);
      onDoubleClick(item);
    }
  }, [item, selectIcon, onDoubleClick]);

  const handleDoubleClickFn = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
    onDoubleClick(item);
  }, [item, onDoubleClick]);

  const handleContextMenuFn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContextMenu) onContextMenu(e, item);
  }, [onContextMenu, item]);

  const handleMouseEnter = useCallback((e) => {
    if (window.innerWidth >= 768) {
      setShowTooltip(true);
      setTooltipPos({ x: e.clientX + 12, y: e.clientY + 12 });
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (showTooltip) {
      setTooltipPos({ x: e.clientX + 12, y: e.clientY + 12 });
    }
  }, [showTooltip]);

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  if (item.icon === 'afterEffects' || item.icon === 'illustrator' || item.icon === 'photoshop' || item.icon === 'premiere') {
    const style = appStyles[item.icon];
    return (
      <>
        <div
          className={`flex flex-col items-center gap-1 p-2 w-24 md:w-28 min-h-[80px] md:min-h-0 cursor-pointer rounded-sm transition-all duration-75 select-none
            ${isSelected && isDesktop ? 'bg-[#000080]/30 outline outline-1 outline-dashed outline-white selection-glow' : 'hover:bg-blue-800/20'}
            ${isFlashing ? 'icon-flash' : ''}
            ${!isDesktop ? 'border border-transparent hover:border-blue-300' : ''}
          `}
          onClick={handleClick}
          onDoubleClick={handleDoubleClickFn}
          onContextMenu={handleContextMenuFn}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-sm border shadow-sm`}
            style={{ backgroundColor: style.bg, borderColor: style.border }}
          >
            <span className="font-bold text-xl md:text-2xl font-sans tracking-tighter" style={{ color: style.textCol }}>{style.label}</span>
          </div>
          <span className={`text-[11px] md:text-xs text-center leading-tight px-1 rounded break-words w-full line-clamp-2
            ${isDesktop ? (isSelected ? 'text-white bg-[#000080]' : 'text-white') : 'text-black'}
          `}>
            {item.label}
          </span>
        </div>
        {showTooltip && (
          <div className="win95-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
            {item.label}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`flex flex-col items-center gap-1 p-2 w-24 md:w-28 min-h-[80px] md:min-h-0 cursor-pointer rounded-sm transition-all duration-75 select-none
          ${isSelected && isDesktop ? 'bg-[#000080]/30 outline outline-1 outline-dashed outline-white selection-glow' : 'hover:bg-blue-800/20'}
          ${isFlashing ? 'icon-flash' : ''}
          ${!isDesktop ? 'border border-transparent hover:border-blue-300' : ''}
        `}
        onClick={handleClick}
        onDoubleClick={handleDoubleClickFn}
        onContextMenu={handleContextMenuFn}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
          {item.icon === 'folder' ? (
            <>
              <Icon size={40} className="text-yellow-400 drop-shadow-sm md:hidden" />
              <Icon size={48} className="text-yellow-400 drop-shadow-sm hidden md:block" />
            </>
          ) : (
            <>
              <Icon size={40} className={`${isDesktop ? 'text-white' : 'text-win-blue'} drop-shadow-sm md:hidden`} />
              <Icon size={48} className={`${isDesktop ? 'text-white' : 'text-win-blue'} drop-shadow-sm hidden md:block`} />
            </>
          )}
        </div>
        <span className={`text-[11px] md:text-xs text-center leading-tight px-1 rounded break-words w-full line-clamp-2
          ${isDesktop ? (isSelected ? 'text-white bg-[#000080]' : 'text-white') : 'text-black'}
        `}>
          {item.label}
        </span>
      </div>
      {showTooltip && (
        <div className="win95-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
          {item.label}
        </div>
      )}
    </>
  );
};

export default DesktopIcon;
