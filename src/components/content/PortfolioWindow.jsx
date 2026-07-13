import React, { useState } from 'react';
import { portfolioProjects } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Film, Palette, Video, Scissors, Layers, X } from 'lucide-react';

const CATEGORY_FILTERS = [
  { key: 'all', label: 'All Projects', icon: Layers },
  { key: 'motion', label: 'Motion Design', icon: Film },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'branding', label: 'Branding', icon: Palette },
];

function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      className="group cursor-pointer relative overflow-hidden border-2 border-gray-400 shadow-win-out hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => onClick(project)}
      whileHover={{ y: -2 }}
    >
      {/* Thumbnail */}
      <div
        className="h-36 relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${project.color}dd, ${project.color}88)` }}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
          }}
        />

        {/* Project initials */}
        <div className="text-white text-4xl font-bold opacity-20 absolute right-3 bottom-0 leading-none select-none" style={{ fontSize: '80px' }}>
          {project.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>

        {/* Category icon */}
        <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
          {project.category === 'motion' && <Film size={28} className="text-white" />}
          {project.category === 'video' && <Video size={28} className="text-white" />}
          {project.category === 'branding' && <Palette size={28} className="text-white" />}
        </div>

        {/* Year badge */}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 font-mono">
          {project.year}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 bg-white">
        <h3 className="font-bold text-sm text-gray-900 truncate">{project.title}</h3>
        <p className="text-[11px] text-gray-500 mt-0.5">{project.client}</p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {project.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-600 font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#000080]/0 group-hover:bg-[#000080]/10 transition-colors pointer-events-none" />
    </motion.div>
  );
}

function ProjectDetail({ project, onBack }) {
  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 border-b border-gray-300 pb-2 shrink-0">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-200 border border-transparent hover:border-gray-400"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-sm font-mono shadow-inner truncate">
          C:\Portfolio\{project.category}\{project.title.replace(/\s/g, '_')}
        </div>
      </div>

      {/* Project Hero */}
      <div
        className="h-48 relative overflow-hidden flex items-center justify-center mb-4 border-2 border-gray-400 shadow-win-in"
        style={{ background: `linear-gradient(135deg, ${project.color}dd, ${project.color}66)` }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
          }}
        />
        <div className="relative z-10 text-center text-white p-4">
          <h2 className="text-2xl font-bold mb-1 drop-shadow-md">{project.title}</h2>
          <p className="text-sm opacity-80">{project.client} • {project.year}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-2 border-gray-400 p-4 shadow-win-in mb-3">
          <h3 className="font-bold text-sm mb-2 text-gray-800">Project Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-200 border border-gray-400 text-gray-700 font-bold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Placeholder for media */}
        <div className="bg-gray-100 border-2 border-gray-300 border-dashed p-6 text-center text-gray-400">
          <Film size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Project media coming soon</p>
          <p className="text-[10px] mt-1">Videos and images will be added here</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioWindow() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="detail"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div
            key="grid"
            className="flex flex-col h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Toolbar */}
            <div className="shrink-0 mb-2 border-b border-gray-300 pb-2">
              <div className="flex gap-0.5 flex-wrap">
                {CATEGORY_FILTERS.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold border transition-colors ${
                      selectedCategory === cat.key
                        ? 'bg-[#000080] text-white border-[#000080]'
                        : 'bg-win-gray border-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    <cat.icon size={12} />
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-mono">
                C:\Portfolio — {filteredProjects.length} project(s) • Click to view details
              </div>
            </div>

            {/* Project Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No projects found for this category.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
