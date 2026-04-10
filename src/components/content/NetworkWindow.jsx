import React from 'react';
import { personalInfo } from '../../data/content';
import { Globe, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function NetworkWindow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
      {personalInfo.socials.map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group p-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 border-dotted"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            {/* Retro icon styling */}
            <social.icon size={48} className="text-win-blue" />
          </div>
          <span className="text-sm text-center group-hover:underline" style={{ fontFamily: 'inherit' }}>{social.name}</span>
        </a>
      ))}
    </div>
  );
}
