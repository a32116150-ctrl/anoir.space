import React, { useState } from 'react';
import { allExperience, experience } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Award, Palette, ChevronDown, ChevronUp, Star } from 'lucide-react';

const CATEGORY_COLORS = {
  motion: { bg: 'bg-blue-100', border: 'border-blue-400', dot: 'bg-blue-500', text: 'text-blue-700', label: 'Motion Design' },
  video: { bg: 'bg-green-100', border: 'border-green-400', dot: 'bg-green-500', text: 'text-green-700', label: 'Video' },
  branding: { bg: 'bg-purple-100', border: 'border-purple-400', dot: 'bg-purple-500', text: 'text-purple-700', label: 'Branding' },
  design: { bg: 'bg-orange-100', border: 'border-orange-400', dot: 'bg-orange-500', text: 'text-orange-700', label: 'Design' },
  leadership: { bg: 'bg-yellow-100', border: 'border-yellow-400', dot: 'bg-yellow-500', text: 'text-yellow-700', label: 'Leadership' },
};

const SECTION_INFO = {
  current: { label: 'Current & Recent', icon: Star, color: 'text-blue-600' },
  past: { label: 'Past Highlights', icon: Award, color: 'text-green-600' },
  branding: { label: 'Branding Portfolio', icon: Palette, color: 'text-purple-600' },
};

function TimelineEntry({ entry, index, isExpanded, onToggle }) {
  const cat = CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.design;

  return (
    <motion.div
      className="flex gap-3 relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      {/* Timeline Line + Dot */}
      <div className="flex flex-col items-center shrink-0 w-6">
        <div className={`w-3.5 h-3.5 rounded-full ${cat.dot} border-2 border-white shadow-md z-10 shrink-0 ${entry.highlight ? 'ring-2 ring-offset-1 ring-blue-300' : ''}`} />
        <div className="w-0.5 flex-1 bg-gray-300 -mt-0.5" />
      </div>

      {/* Content Card */}
      <div
        className={`flex-1 mb-3 border ${cat.border} ${cat.bg} p-3 cursor-pointer hover:shadow-md transition-all group relative ${isExpanded ? 'shadow-md' : ''}`}
        onClick={onToggle}
        style={{ borderLeft: `3px solid` }}
      >
        {entry.highlight && (
          <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 border border-yellow-600 rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            <Star size={10} className="text-yellow-800 fill-current" />
          </div>
        )}

        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-gray-900">{entry.company}</div>
            <div className="text-xs text-gray-600 mt-0.5">{entry.role}</div>
            {entry.period && (
              <div className="text-[10px] text-gray-500 mt-0.5 font-mono">{entry.period}</div>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${cat.bg} ${cat.text} border ${cat.border} font-bold`}>
              {cat.label}
            </span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 pt-2 border-t border-gray-300 text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {entry.description || "No additional details available."}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TimelineWindow() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('all');
  const [filter, setFilter] = useState('all');

  const toggleExpand = (idx) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  const getSectionEntries = () => {
    if (activeSection === 'all') {
      const entries = [];
      experience.current?.forEach(e => entries.push({ ...e, section: 'current' }));
      experience.past?.forEach(e => entries.push({ ...e, section: 'past' }));
      experience.branding?.forEach(e => entries.push({ ...e, section: 'branding' }));
      return entries;
    }
    return experience[activeSection]?.map(e => ({ ...e, section: activeSection })) || [];
  };

  let entries = getSectionEntries();

  // Apply category filter
  if (filter !== 'all') {
    entries = entries.filter(e => e.category === filter);
  }

  const categories = ['all', 'motion', 'branding', 'video', 'design', 'leadership'];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Header / Controls */}
      <div className="shrink-0 border-b border-gray-300 pb-2 mb-2">
        {/* Section Tabs */}
        <div className="flex gap-0.5 mb-2">
          {[
            { key: 'all', label: 'All' },
            ...Object.entries(SECTION_INFO).map(([key, val]) => ({ key, label: val.label })),
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveSection(tab.key); setExpandedIndex(null); }}
              className={`px-3 py-1 text-xs font-bold border transition-colors ${
                activeSection === tab.key
                  ? 'bg-[#000080] text-white border-[#000080]'
                  : 'bg-win-gray border-gray-400 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex gap-1 flex-wrap">
          {categories.map(cat => {
            const info = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setExpandedIndex(null); }}
                className={`px-2 py-0.5 text-[10px] font-bold border rounded transition-colors ${
                  filter === cat
                    ? cat === 'all'
                      ? 'bg-gray-700 text-white border-gray-700'
                      : `${info?.bg} ${info?.text} ${info?.border}`
                    : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : info?.label || cat}
              </button>
            );
          })}
        </div>

        <div className="text-[10px] text-gray-400 mt-1 font-mono">
          C:\Career\Timeline — {entries.length} item(s) • Click an entry to expand
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto pr-1">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No entries found for this filter.
          </div>
        ) : (
          <div className="pl-1 pt-1">
            {entries.map((entry, idx) => (
              <TimelineEntry
                key={`${entry.company}-${idx}`}
                entry={entry}
                index={idx}
                isExpanded={expandedIndex === idx}
                onToggle={() => toggleExpand(idx)}
              />
            ))}
            {/* Timeline End */}
            <div className="flex gap-3 items-center pb-2">
              <div className="flex flex-col items-center w-6">
                <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white shadow z-10" />
              </div>
              <span className="text-xs text-gray-400 italic">The journey continues...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
