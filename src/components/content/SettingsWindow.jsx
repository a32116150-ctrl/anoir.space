import React, { useState, useEffect } from 'react';
import { Monitor, Type, Check } from 'lucide-react';

export const WALLPAPERS = [
  { id: 'clouds', name: 'Clouds', type: 'image', value: '/clouds.svg', color: '#3a6ea5' },
  { id: 'teal', name: 'Windows Teal', type: 'color', value: '#008080' },
  { id: 'blue', name: 'Solid Blue', type: 'color', value: '#000080' },
  { id: 'black', name: 'Black', type: 'color', value: '#000000' },
  { id: 'autumn', name: 'Autumn', type: 'color', value: '#d2691e' }, // Chocolate
];

export const FONTS = [
  { id: 'tahoma', name: 'Tahoma (Classic)', value: "'Tahoma', 'Verdana', 'Segoe UI', sans-serif" },
  { id: 'arial', name: 'Arial', value: "Arial, Helvetica, sans-serif" },
  { id: 'courier', name: 'Courier New', value: "'Courier New', Courier, monospace" },
  { id: 'times', name: 'Times New Roman', value: "'Times New Roman', Times, serif" },
  { id: 'comic', name: 'Comic Sans MS', value: "'Comic Sans MS', 'Chalkboard SE', sans-serif" },
  { id: 'pixel', name: 'Pixelify Sans', value: "'Pixelify Sans', cursive" },
];

export default function SettingsWindow({ currentWallpaper, onWallpaperChange, currentFont, onFontChange }) {
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
