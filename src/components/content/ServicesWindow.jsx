import React, { useState } from 'react';
import { services } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';

function ServiceItem({ service, index, isExpanded, onToggle, onContact }) {
  return (
    <motion.div
      className="border border-gray-400 bg-white shadow-win-out mb-2 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors group"
        onClick={onToggle}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-[#000080] to-[#008080] flex items-center justify-center text-white border border-gray-500 shadow-sm shrink-0 group-hover:from-[#0000a0] group-hover:to-[#009090] transition-all">
          <service.icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-gray-900">{service.name}</h3>
          <p className="text-[11px] text-gray-500 truncate">{service.description}</p>
        </div>
        <div className="shrink-0 text-gray-400">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
            <div className="px-3 pb-3 border-t border-gray-300">
              <p className="text-sm text-gray-700 mt-2 mb-3 leading-relaxed">
                {service.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onContact(service.name); }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#000080] text-white border-2 border-white shadow-win-out active:shadow-win-in text-xs font-bold hover:bg-[#0000a0] transition-colors"
                >
                  <Mail size={12} />
                  Request Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesWindow({ onOpenWindow }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleContact = (serviceName) => {
    if (onOpenWindow) {
      onOpenWindow('contact');
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Header */}
      <div className="shrink-0 mb-2 border-b border-gray-300 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#000080] to-[#008080] flex items-center justify-center rounded-sm">
            <span className="text-white text-lg">🎯</span>
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">Services I Offer</h2>
            <p className="text-[10px] text-gray-500 font-mono">C:\Services — {services.length} item(s) • Click to expand</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 overflow-y-auto">
        {services.map((service, idx) => (
          <ServiceItem
            key={service.id}
            service={service}
            index={idx}
            isExpanded={expandedId === service.id}
            onToggle={() => setExpandedId(prev => prev === service.id ? null : service.id)}
            onContact={handleContact}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="shrink-0 mt-2 pt-2 border-t border-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[10px] text-gray-400 text-center italic">
          Custom packages available — Contact me to discuss your project needs
        </p>
      </motion.div>
    </div>
  );
}
