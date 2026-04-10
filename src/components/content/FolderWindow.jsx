import React from 'react';
import DesktopIcon from '../DesktopIcon';

export default function FolderWindow({ data, onOpenWindow }) {
  const items = data?.items || [];

  return (
    <div className="p-4 flex flex-wrap gap-4 bg-white h-full content-start">
      {items.length === 0 && (
          <div className="w-full text-center text-gray-500 mt-10">This folder is empty</div>
      )}
      {items.map(item => (
        <div key={item.id} className="relative">
            <DesktopIcon 
              item={item} 
              variant="window"
              onDoubleClick={(item) => {
                 // For system apps like Ae, Ai, etc.
                 if (item.type === 'system') {
                    onOpenWindow(item.id);
                 }
              }}
              // Pass empty context menu or specific one for folder items
              onContextMenu={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
              }}
            />
        </div>
      ))}
    </div>
  );
}
