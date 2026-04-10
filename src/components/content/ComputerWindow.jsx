import React from 'react';
import { HardDrive, Disc } from 'lucide-react';

export default function ComputerWindow({ onOpenWindow }) {
  const drives = [
    { id: 'c', label: 'Local Disk (C:)', icon: HardDrive, info: 'System' },
    { id: 'd', label: 'Data (D:)', icon: HardDrive, info: 'Data' },
    { id: 'e', label: 'CD Drive (E:)', icon: Disc, info: 'Audio CD' },
  ];

  const handleDriveDoubleClick = (id) => {
    if (id === 'e') {
      onOpenWindow('winamp');
    } else {
      alert('Access Denied: Drive is encrypted or empty.');
    }
  };

  return (
    <div className="p-4 flex flex-wrap gap-6 bg-white h-full content-start">
      {drives.map(drive => (
        <div 
          key={drive.id} 
          className="flex flex-col items-center gap-2 w-24 group cursor-pointer hover:bg-blue-100 p-2 border border-transparent hover:border-blue-300 rounded"
          onDoubleClick={() => handleDriveDoubleClick(drive.id)}
        >
          <drive.icon size={48} className="text-gray-600" />
          <div className="text-center">
             <div className="text-sm font-bold">{drive.label}</div>
             <div className="text-xs text-gray-500">{drive.info}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
