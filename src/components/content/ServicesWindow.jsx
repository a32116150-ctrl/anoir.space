import React from 'react';
import { services } from '../../data/content';

export default function ServicesWindow() {
  return (
    <div>
      <p className="mb-2 text-sm">Select a tool to view details:</p>
      <div className="grid grid-cols-1 gap-1">
        {services.map(service => (
          <div key={service.id} className="group flex items-center gap-3 p-2 border border-transparent hover:bg-win-blue hover:text-white cursor-pointer">
             <div className="w-10 h-10 bg-gray-200 flex items-center justify-center text-black border border-gray-500 shadow-sm group-hover:border-white">
                <service.icon size={24} />
             </div>
             <span className="text-base font-bold font-pixel">{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
