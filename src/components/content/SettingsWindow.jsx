import React, { useState, useEffect } from 'react';
import { Monitor, Type, Check, Sparkles, Sun } from 'lucide-react';
import { WALLPAPERS, FONTS } from '../../data/settings';

// Re-export for backward compatibility
export { WALLPAPERS, FONTS };

export default function SettingsWindow({ currentWallpaper, onWallpaperChange, currentFont, onFontChange, holidayEnabled, onToggleHoliday, activeHoliday, seasonalEnabled, onToggleSeasonal, activeSeason }) {
  // Local state for preview
  const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
  const [selectedFont, setSelectedFont] = useState(currentFont);

  const [applied, setApplied] = useState(false);

  // Sync local state when props change (e.g. if changed externally)
  useEffect(() => {
    setSelectedWallpaper(currentWallpaper);
    setSelectedFont(currentFont);
  }, [currentWallpaper, currentFont]);

  const handleApply = () => {
    onWallpaperChange(selectedWallpaper);
    onFontChange(selectedFont);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-2 w-full h-full">
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Preview Monitor */}
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-24 bg-gray-300 border-4 border-gray-400 rounded-t-lg shadow-win-in flex items-center justify-center p-2">
                <div 
                    className="w-full h-full border border-gray-600 shadow-inner flex items-center justify-center"
                    style={{
                        background: selectedWallpaper.type === 'color' ? selectedWallpaper.value : `url(${selectedWallpaper.value})`,
                        backgroundColor: selectedWallpaper.color || selectedWallpaper.value,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        fontFamily: selectedFont.value
                    }}
                >
                    <span className="bg-white px-1 text-xs border border-black shadow-win-out">Text</span>
                </div>
            </div>
            <div className="w-36 h-4 bg-gray-400 rounded-b-lg shadow-win-out"></div>
            <div className="w-16 h-2 bg-gray-500 rounded-full shadow-md mt-[-2px]"></div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Wallpaper Section */}
            <fieldset className="border border-white shadow-win-in p-2 flex-1 min-h-0 flex flex-col">
                <legend className="text-sm px-1">Wallpaper</legend>
                <div className="bg-white border-2 border-gray-400 shadow-inner overflow-y-auto flex-1">
                    {WALLPAPERS.map(wp => (
                        <div 
                            key={wp.id}
                            onClick={() => setSelectedWallpaper(wp)}
                            className={`px-2 py-0.5 cursor-pointer text-sm font-bold flex items-center gap-2 ${selectedWallpaper.id === wp.id ? 'bg-win-blue text-white' : 'hover:bg-gray-100'}`}
                        >
                            <Monitor size={12} />
                            {wp.name}
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Holiday Theme Section */}
            <fieldset className="border border-white shadow-win-in p-2 flex-shrink-0">
                <legend className="text-sm px-1 flex items-center gap-1">
                    <Sparkles size={12} /> Holiday Theme
                </legend>
                <div className="bg-white border-2 border-gray-400 shadow-inner p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">Auto-apply holiday themes</span>
                        <button
                            onClick={onToggleHoliday}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                holidayEnabled ? 'bg-[#000080]' : 'bg-gray-400'
                            }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${
                                holidayEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>
                    {activeHoliday && holidayEnabled && (
                        <div className="bg-[#000080]/5 border border-[#000080]/20 p-2 text-xs">
                            <span className="font-bold">{activeHoliday.icon} {activeHoliday.name}</span>
                            <span className="text-gray-500 ml-1">theme active</span>
                        </div>
                    )}
                    {!activeHoliday && holidayEnabled && (
                        <p className="text-[10px] text-gray-400 italic">No holiday today — default theme active</p>
                    )}
                </div>
            </fieldset>

            {/* Seasonal Theme Section */}
            <fieldset className="border border-white shadow-win-in p-2 flex-shrink-0">
                <legend className="text-sm px-1 flex items-center gap-1">
                    <Sun size={12} /> Seasonal Theme
                </legend>
                <div className="bg-white border-2 border-gray-400 shadow-inner p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">Auto-apply seasonal themes</span>
                        <button
                            onClick={onToggleSeasonal}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                                seasonalEnabled ? 'bg-[#000080]' : 'bg-gray-400'
                            }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${
                                seasonalEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>
                    {activeSeason && seasonalEnabled && (
                        <div className="bg-[#000080]/5 border border-[#000080]/20 p-2 text-xs">
                            <span className="font-bold">{activeSeason.icon} {activeSeason.name}</span>
                            <span className="text-gray-500 ml-1">theme active</span>
                        </div>
                    )}
                    {!activeSeason && seasonalEnabled && (
                        <p className="text-[10px] text-gray-400 italic">No seasonal theme active</p>
                    )}
                </div>
            </fieldset>

            {/* Font Section */}
            <fieldset className="border border-white shadow-win-in p-2 flex-1 min-h-0 flex flex-col">
                <legend className="text-sm px-1">System Font</legend>
                <div className="bg-white border-2 border-gray-400 shadow-inner overflow-y-auto flex-1">
                    {FONTS.map(font => (
                        <div 
                            key={font.id}
                            onClick={() => setSelectedFont(font)}
                            className={`px-2 py-0.5 cursor-pointer text-sm font-bold flex items-center gap-2 ${selectedFont.id === font.id ? 'bg-win-blue text-white' : 'hover:bg-gray-100'}`}
                            style={{ fontFamily: font.value }}
                        >
                            <Type size={12} />
                            {font.name}
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-gray-300">
        <button 
            onClick={handleApply}
            className={`px-4 py-1 border-t border-l border-b border-r shadow-win-out active:shadow-win-in min-w-[80px] text-sm hover:bg-gray-200 active:translate-y-px font-bold flex items-center justify-center gap-1 transition-colors ${applied ? 'bg-green-100 border-green-500 text-green-700' : 'bg-win-gray border-white border-b-black border-r-black'}`}
        >
            <Check size={14} /> {applied ? 'Applied!' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
