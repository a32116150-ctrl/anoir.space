import React, { useState, useRef } from 'react';
import { experience } from '../../data/content';
import { Folder, FileText, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSystem } from '../../context/SystemContext';

export default function ExperienceWindow() {
  const [currentPath, setCurrentPath] = useState('root');
  const [viewingFile, setViewingFile] = useState(null);
  const [deletedItems, setDeletedItems] = useState(new Set());
  const { clipboard, copyToClipboard } = useSystem();
  const [pastedItems, setPastedItems] = useState([]); // Array of copied items to render
  
  const containerRef = useRef(null);

  const isDeleted = (id) => deletedItems.has(id);

  const deleteItem = (id) => {
    setDeletedItems(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
    });
  };

  const handleCopy = (id, data, isCut = false) => {
    copyToClipboard({ ...data, id }, isCut ? 'cut' : 'copy');
  };

  const handlePaste = () => {
    if (!clipboard) return;

    if (clipboard.operation === 'cut') {
        // Remove from original location (add to deleted)
        if (clipboard.data.id) deleteItem(clipboard.data.id);
        // Add to new location (pasted items)
        setPastedItems(prev => [...prev, { ...clipboard.data, id: `pasted-${Date.now()}`, originalId: clipboard.data.id, path: currentPath }]);
        // Note: Global clipboard is not cleared here to allow multiple pastes if needed, 
        // but for 'cut' usually it is cleared. We'll leave it for now.
    } else {
        // Copy: Just add new instance
        setPastedItems(prev => [...prev, { ...clipboard.data, id: `copy-${Date.now()}`, path: currentPath }]);
    }
  };

  const handleBack = () => {
    if (viewingFile) {
      setViewingFile(null);
    } else if (currentPath !== 'root') {
      setCurrentPath('root');
    }
  };

  const getPathString = () => {
    const basePath = 'C:\\Experience';
    if (viewingFile) {
        let folder = '';
        if (currentPath === 'current') folder = '\\Current_Recent';
        else if (currentPath === 'past') folder = '\\Past_Highlights';
        else if (currentPath === 'branding') folder = '\\Branding';
        return `${basePath}${folder}\\${viewingFile.company}`;
    }
    if (currentPath === 'root') return basePath;
    
    let folderName = '';
    if (currentPath === 'current') folderName = 'Current_Recent';
    else if (currentPath === 'past') folderName = 'Past_Highlights';
    else if (currentPath === 'branding') folderName = 'Branding';

    return `${basePath}\\${folderName}`;
  };

  const DraggableIcon = ({ id, icon: Icon, label, data, onClick, onDoubleClick, className }) => {
    if (isDeleted(id)) return null;
    
    const isCut = clipboard?.data?.id === id && clipboard?.operation === 'cut';

    return (
      <motion.div
        drag
        dragConstraints={containerRef}
        dragMomentum={false}
        whileDrag={{ scale: 1.1, zIndex: 10 }}
        className={`flex flex-col items-center gap-2 w-28 p-2 cursor-pointer group ${className} ${isCut ? 'opacity-50' : ''}`}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onContextMenu={(e) => {
            e.preventDefault();
            // Custom Context Menu logic would go here, using simple prompt for now
            const action = window.prompt(`Options for '${label}':\nType 'copy', 'cut', or 'delete'`, '');
            if (action === 'delete') deleteItem(id);
            if (action === 'copy') handleCopy(id, data, false);
            if (action === 'cut') handleCopy(id, data, true);
        }}
      >
        <div className="w-16 h-16 flex items-center justify-center relative">
             <Icon size={64} className={className?.includes('text-yellow') ? "text-yellow-500 fill-current" : "text-win-blue"} />
        </div>
        <span className="text-sm text-center font-sans bg-white/50 px-1 rounded group-hover:bg-blue-700 group-hover:text-white select-none break-words w-full" style={{ fontFamily: 'inherit' }}>
            {label}
        </span>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (viewingFile) {
        return (
            <div className="p-4 text-base" style={{ fontFamily: 'inherit' }}>
                <div className="mb-4 border-b border-gray-300 pb-2">
                    <h2 className="text-xl font-bold">{viewingFile.company}</h2>
                    <p className="text-gray-500">{viewingFile.role} {viewingFile.period && `| ${viewingFile.period}`}</p>
                </div>
                <div className="whitespace-pre-wrap">
                    {viewingFile.description || "No additional details available."}
                </div>
            </div>
        );
    }

    if (currentPath === 'root') {
      return (
        <div className="flex flex-wrap gap-4 p-4">
          <DraggableIcon 
            id="folder-current"
            icon={Folder}
            label="Current_Recent"
            className="text-yellow-500"
            data={{ type: 'folder', target: 'current', label: 'Current_Recent' }}
            onDoubleClick={() => setCurrentPath('current')}
          />
          <DraggableIcon 
            id="folder-past"
            icon={Folder}
            label="Past_Highlights"
            className="text-yellow-500"
            data={{ type: 'folder', target: 'past', label: 'Past_Highlights' }}
            onDoubleClick={() => setCurrentPath('past')}
          />
          <DraggableIcon 
            id="folder-branding"
            icon={Folder}
            label="Branding"
            className="text-yellow-500"
            data={{ type: 'folder', target: 'branding', label: 'Branding' }}
            onDoubleClick={() => setCurrentPath('branding')}
          />
          {/* Render Pasted Items (if root is their home) */}
          {pastedItems.filter(i => i.path === 'root').map(item => (
            <DraggableIcon
                key={item.id}
                id={item.id}
                icon={item.type === 'folder' ? Folder : FileText}
                label={item.company || item.label || 'File'}
                data={item}
                className={item.type === 'folder' ? "text-yellow-500" : "text-win-blue"}
                onDoubleClick={() => {
                    if (item.type === 'folder') setCurrentPath(item.target);
                    else setViewingFile(item);
                }}
            />
          ))}
        </div>
      );
    }

    let data = [];
    let pathPrefix = '';

    if (currentPath === 'current') {
        data = experience.current;
        pathPrefix = 'curr';
    } else if (currentPath === 'past') {
        data = experience.past;
        pathPrefix = 'past';
    } else if (currentPath === 'branding') {
        data = experience.branding;
        pathPrefix = 'brand';
    }

    return (
      <div className="flex flex-wrap gap-6 p-4">
        {data.map((job, idx) => {
            const id = `${pathPrefix}-${idx}`;
            return (
                <DraggableIcon 
                    key={id}
                    id={id}
                    icon={FileText}
                    label={job.company}
                    data={job}
                    onDoubleClick={() => setViewingFile(job)}
                    className="text-win-blue"
                />
            );
        })}
        
        {/* Render Pasted Items in subfolders */}
        {pastedItems.filter(i => i.path === currentPath).map(item => (
            <DraggableIcon
                key={item.id}
                id={item.id}
                icon={item.type === 'folder' ? Folder : FileText}
                label={item.company || item.label || 'File'}
                data={item}
                className={item.type === 'folder' ? "text-yellow-500" : "text-win-blue"}
                onDoubleClick={() => {
                    if (item.type === 'folder') setCurrentPath(item.target);
                    else setViewingFile(item);
                }}
            />
        ))}

        {data.length === 0 && pastedItems.filter(i => i.path === currentPath).length === 0 && (
            <div className="w-full text-center mt-10">
                <p className="text-sm text-gray-500">This folder is empty.</p>
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2 border-b border-gray-300 pb-2 shrink-0">
         <button 
           disabled={currentPath === 'root' && !viewingFile}
           onClick={handleBack}
           className="p-1 hover:bg-gray-200 disabled:opacity-30"
         >
           <ArrowLeft size={16} />
         </button>
         <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-sm font-mono shadow-inner truncate">
           {getPathString()}
         </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="flex-1 min-h-[300px] bg-white border border-gray-300 shadow-inner overflow-hidden relative"
        onContextMenu={(e) => {
            // Background context menu for Paste
            if (e.target === e.currentTarget) {
                e.preventDefault();
                if (clipboard) {
                    const action = window.confirm(`Paste item '${clipboard.data.company || 'Folder'}' here?`);
                    if (action) handlePaste();
                }
            }
        }}
      >
        {renderContent()}
        
        {/* Help Text overlay - Only show in list view */}
        {!viewingFile && (
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 pointer-events-none select-none bg-white/80 px-1">
                Right-click item to Copy/Cut • Right-click background to Paste
            </div>
        )}
      </div>
    </div>
  );
}
