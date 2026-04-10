import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function SystemDialog({ isOpen, onClose, onYes, onNo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-win-gray border-2 border-win-gray-light shadow-win-out p-1 w-[320px] sm:w-[400px]"
        >
            <div className="bg-win-blue text-white px-2 py-1 flex justify-between items-center mb-4 select-none">
                <span className="font-bold text-sm font-pixel">System Message</span>
                <button 
                    onClick={onClose} 
                    className="bg-win-gray text-black border border-white shadow-win-out w-5 h-5 flex items-center justify-center hover:bg-red-500 hover:text-white"
                >
                    <X size={12} />
                </button>
            </div>
            
            <div className="flex gap-4 px-4 mb-6 items-center">
                <AlertTriangle size={48} className="text-yellow-500 shrink-0" />
                <div className="font-sans text-sm">
                    <p className="font-bold mb-1">Confirmation Required</p>
                    <p>Are you ready to elevate your brand?</p>
                </div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
                <button 
                    onClick={onYes}
                    className="px-4 py-1 bg-win-gray border-t border-l border-white border-b border-r border-black shadow-win-out active:shadow-win-in min-w-[100px] font-bold text-sm hover:bg-gray-200 active:translate-y-px"
                >
                    Yes (Book Call)
                </button>
                <button 
                    onClick={onNo}
                    className="px-4 py-1 bg-win-gray border-t border-l border-white border-b border-r border-black shadow-win-out active:shadow-win-in min-w-[100px] text-sm hover:bg-gray-200 active:translate-y-px"
                >
                    No (Get CV)
                </button>
            </div>
        </motion.div>
    </div>
  )
}
