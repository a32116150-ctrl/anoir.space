import React, { useState } from 'react';
import { skills, stats } from '../../data/content';
import { motion } from 'framer-motion';
import { Monitor, Cpu, HardDrive, ChevronRight, ChevronDown, Info, Zap } from 'lucide-react';

function RetroProgressBar({ level, delay = 0, color = '#000080' }) {
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="flex-1 h-4 bg-white border-2 border-gray-500 shadow-win-in overflow-hidden relative">
        <motion.div
          className="h-full"
          style={{
            background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 6px, ${color}cc 6px, ${color}cc 8px)`,
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-mono text-gray-600 w-8 text-right font-bold">{level}%</span>
    </div>
  );
}

function TreeItem({ label, children, icon: Icon, defaultOpen = false, level = 0 }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = children && React.Children.count(children) > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-0.5 px-1 cursor-pointer hover:bg-blue-100 select-none ${level === 0 ? 'font-bold' : ''}`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        style={{ paddingLeft: `${level * 16 + 4}px` }}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={12} className="shrink-0" /> : <ChevronRight size={12} className="shrink-0" />
        ) : (
          <span className="w-3 shrink-0" />
        )}
        {Icon && <Icon size={14} className="shrink-0 text-gray-600" />}
        <span className="text-xs truncate">{label}</span>
      </div>
      {isOpen && children && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function SkillsWindow() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'General' },
    { key: 'software', label: 'Software' },
    { key: 'expertise', label: 'Expertise' },
    { key: 'device', label: 'Device Manager' },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Tab Header */}
      <div className="flex gap-0 shrink-0 -mb-[1px] relative z-10">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 text-xs font-bold border border-gray-400 transition-colors ${
              activeTab === tab.key
                ? 'bg-[#c0c0c0] border-b-[#c0c0c0] -mb-[1px] rounded-t relative z-10'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 border border-gray-400 bg-[#c0c0c0] p-3 overflow-y-auto">
        {activeTab === 'overview' && (
          <div>
            {/* System Info Header */}
            <div className="flex gap-4 mb-4 items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#000080] to-[#008080] flex items-center justify-center shadow-win-out border border-gray-600">
                <Monitor size={32} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Anoir Cherif Creative System</h3>
                <p className="text-[11px] text-gray-600">Version 7.0 (Build 2025)</p>
                <p className="text-[11px] text-gray-600">Registered to: Anoir Cherif</p>
                <p className="text-[11px] text-gray-600">Product ID: CREATIVE-2018-2025-PRO</p>
              </div>
            </div>

            {/* Stats Grid */}
            <fieldset className="border border-white shadow-win-in p-3 mb-3">
              <legend className="text-xs px-1 font-bold">System Statistics</legend>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white border border-gray-400 shadow-win-in p-2 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-lg font-bold text-[#000080]">{stat.value}</div>
                    <div className="text-[10px] text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </fieldset>

            {/* System Resources */}
            <fieldset className="border border-white shadow-win-in p-3">
              <legend className="text-xs px-1 font-bold">Creative Resources</legend>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 shrink-0">Creativity:</span>
                  <RetroProgressBar level={95} delay={0.2} color="#008000" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 shrink-0">Motivation:</span>
                  <RetroProgressBar level={88} delay={0.3} color="#008080" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 shrink-0">Coffee Level:</span>
                  <RetroProgressBar level={100} delay={0.4} color="#800000" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-28 shrink-0">Available:</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Zap size={12} className="text-green-600" />
                    <span className="text-green-700 font-bold">Yes — Open to opportunities</span>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === 'software' && (
          <div>
            <fieldset className="border border-white shadow-win-in p-3">
              <legend className="text-xs px-1 font-bold">Installed Software — Proficiency</legend>
              <div className="space-y-2.5">
                {skills.software.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-6 h-6 bg-gray-200 border border-gray-500 flex items-center justify-center text-[8px] font-bold text-gray-700 shrink-0 shadow-sm uppercase">
                      {skill.icon}
                    </div>
                    <span className="text-xs w-36 shrink-0 truncate font-bold">{skill.name}</span>
                    <RetroProgressBar level={skill.level} delay={i * 0.1} color={
                      skill.level >= 90 ? '#000080' :
                      skill.level >= 80 ? '#006060' :
                      skill.level >= 70 ? '#606000' :
                      '#606060'
                    } />
                  </motion.div>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === 'expertise' && (
          <div>
            <fieldset className="border border-white shadow-win-in p-3">
              <legend className="text-xs px-1 font-bold">Core Expertise — Skill Levels</legend>
              <div className="space-y-2.5">
                {skills.expertise.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="text-xs w-40 shrink-0 truncate">{skill.name}</span>
                    <RetroProgressBar level={skill.level} delay={i * 0.1} color={
                      skill.level >= 90 ? '#800080' :
                      skill.level >= 80 ? '#000080' :
                      '#006060'
                    } />
                  </motion.div>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === 'device' && (
          <div className="bg-white border-2 border-gray-400 shadow-win-in p-1 h-full overflow-y-auto">
            <TreeItem label="🖥️ Anoir Cherif Creative Workstation" icon={Monitor} defaultOpen level={0}>
              <TreeItem label="Design Suite" icon={Cpu} defaultOpen level={1}>
                {skills.software.filter(s => s.category === 'Design').map(s => (
                  <TreeItem key={s.name} label={`${s.name} (${s.level}%)`} level={2} />
                ))}
              </TreeItem>
              <TreeItem label="Motion & Video" icon={Cpu} defaultOpen level={1}>
                {skills.software.filter(s => ['Motion', 'Video'].includes(s.category)).map(s => (
                  <TreeItem key={s.name} label={`${s.name} (${s.level}%)`} level={2} />
                ))}
              </TreeItem>
              <TreeItem label="3D & Modeling" icon={Cpu} level={1}>
                {skills.software.filter(s => s.category === '3D').map(s => (
                  <TreeItem key={s.name} label={`${s.name} (${s.level}%)`} level={2} />
                ))}
              </TreeItem>
              <TreeItem label="UI/UX Tools" icon={Cpu} level={1}>
                {skills.software.filter(s => s.category === 'UI/UX').map(s => (
                  <TreeItem key={s.name} label={`${s.name} (${s.level}%)`} level={2} />
                ))}
              </TreeItem>
              <TreeItem label="Storage" icon={HardDrive} level={1}>
                <TreeItem label="50+ Projects (Completed)" level={2} />
                <TreeItem label="15+ Brand Identities" level={2} />
                <TreeItem label="∞ Unused Design Concepts" level={2} />
              </TreeItem>
            </TreeItem>
          </div>
        )}
      </div>
    </div>
  );
}
