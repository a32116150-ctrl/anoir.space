import React from 'react';
import { aboutMe } from '../../data/content';

export default function AboutWindow() {
  return (
    <div className="text-base leading-relaxed max-w-md" style={{ fontFamily: 'inherit' }}>
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-300 border border-gray-500 shadow-win-in flex-shrink-0 flex items-center justify-center overflow-hidden">
            {/* Placeholder for Profile Pic */}
            <span className="text-4xl">👨‍🎨</span>
        </div>
        <div>
            <h2 className="font-bold text-lg mb-1">Anoir Cherif</h2>
            <p className="text-gray-600 italic mb-2">Visual Creator & Motion Designer</p>
            <p>Nabeul, Tunisia</p>
        </div>
      </div>
      <p>{aboutMe}</p>
    </div>
  );
}
