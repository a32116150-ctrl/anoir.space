import React, { useState } from 'react';
import { videoWork, videoCategories } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink, Film, Video, Layers, X } from 'lucide-react';

const CATEGORY_COLORS = {
  motion: '#8338ec',
  editing: '#06d6a0',
  explainer: '#0066cc',
  documentary: '#ff6b35',
};

function VideoCard({ video, index, onClick }) {
  const color = CATEGORY_COLORS[video.category] || '#666';

  return (
    <motion.div
      className="group cursor-pointer relative overflow-hidden border-2 border-gray-400 shadow-win-out hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => onClick(video)}
      whileHover={{ y: -2 }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-black">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={`Thumbnail for ${video.title}`}
          width="320"
          height="180"
          decoding="async"
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Play size={18} className="text-gray-900 ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Category badge */}
        <div
          className="absolute top-1.5 left-1.5 text-[9px] px-1.5 py-0.5 font-bold text-white uppercase tracking-wide"
          style={{ backgroundColor: color }}
        >
          {video.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 bg-white">
        <h3 className="font-bold text-sm text-gray-900 truncate">{video.title}</h3>
        <div className="flex gap-1 mt-2 flex-wrap">
          {video.tags.slice(0, 2).map(tag => (
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
      <div className="absolute inset-0 bg-[#000080]/0 group-hover:bg-[#000080]/5 transition-colors pointer-events-none" />
    </motion.div>
  );
}

function VideoDetail({ video, onBack }) {
  const color = CATEGORY_COLORS[video.category] || '#666';

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
          C:\VideoWork\{video.category}\{video.title.replace(/\s/g, '_')}
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full mb-3 border-2 border-gray-400 shadow-win-in bg-black">
        <div className="relative pb-[56.25%]">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-2 border-gray-400 p-4 shadow-win-in mb-3">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-bold text-sm text-gray-900">{video.title}</h2>
            <span
              className="text-[9px] px-1.5 py-0.5 font-bold text-white uppercase tracking-wide"
              style={{ backgroundColor: color }}
            >
              {video.category}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{video.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {video.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-200 border border-gray-400 text-gray-700 font-bold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Watch on YouTube link */}
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-bold border-2 border-red-800 hover:bg-red-700 transition-colors shadow-win-out"
        >
          <ExternalLink size={12} />
          Watch on YouTube
        </a>
      </div>
    </motion.div>
  );
}

export default function VideoLibraryWindow() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = selectedCategory === 'all'
    ? videoWork
    : videoWork.filter(v => v.category === selectedCategory);

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      <AnimatePresence mode="wait">
        {selectedVideo ? (
          <VideoDetail
            key="detail"
            video={selectedVideo}
            onBack={() => setSelectedVideo(null)}
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
                {videoCategories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold border transition-colors ${
                      selectedCategory === cat.key
                        ? 'bg-[#000080] text-white border-[#000080]'
                        : 'bg-win-gray border-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    {cat.key === 'all' && <Layers size={12} />}
                    {cat.key === 'motion' && <Film size={12} />}
                    {cat.key === 'editing' && <Video size={12} />}
                    {cat.key === 'explainer' && <Play size={12} />}
                    {cat.key === 'documentary' && <Film size={12} />}
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-mono">
                C:\VideoWork — {filteredVideos.length} video(s) • Click to watch
              </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-1">
                {filteredVideos.map((video, idx) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={idx}
                    onClick={setSelectedVideo}
                  />
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No videos found for this category.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
