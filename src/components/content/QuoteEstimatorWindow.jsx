import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronRight, ChevronLeft, Send, Download, Sparkles, Clock, Layers, Zap } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { personalInfo } from '../../data/content';

const PRICING = {
  motion: {
    label: 'Motion Design',
    description: 'Animations, explainer videos, social media content',
    icon: '🎬',
    tiers: {
      simple: { label: 'Simple', desc: '15-30s animation, basic transitions', base: [800, 1200] },
      standard: { label: 'Standard', desc: '30-60s explainer, custom animation', base: [1200, 2000] },
      complex: { label: 'Complex', desc: 'Multi-scene, character animation, VFX', base: [2000, 3500] },
    },
  },
  video: {
    label: 'Video Editing',
    description: 'Corporate videos, social media, events',
    icon: '🎥',
    tiers: {
      simple: { label: 'Simple', desc: 'Basic cuts, color correction, titles', base: [300, 600] },
      standard: { label: 'Standard', desc: 'Multi-cam, transitions, sound design', base: [600, 1200] },
      complex: { label: 'Complex', desc: 'Advanced grading, VFX, motion graphics', base: [1200, 2500] },
    },
  },
  branding: {
    label: 'Branding & Identity',
    description: 'Logo, brand guidelines, visual system',
    icon: '🎨',
    tiers: {
      simple: { label: 'Simple', desc: 'Logo + basic brand card', base: [1500, 2500] },
      standard: { label: 'Standard', desc: 'Full logo system + guidelines doc', base: [2500, 4000] },
      complex: { label: 'Complex', desc: 'Complete identity + mockups + stationery', base: [4000, 7000] },
    },
  },
  graphic: {
    label: 'Graphic Design',
    description: 'Social media, print materials, presentations',
    icon: '✏️',
    tiers: {
      simple: { label: 'Simple', desc: '1-3 social media posts or flyers', base: [200, 500] },
      standard: { label: 'Standard', desc: 'Social media kit, print materials', base: [500, 1000] },
      complex: { label: 'Complex', desc: 'Full campaign, multi-format deliverables', base: [1000, 2000] },
    },
  },
  web: {
    label: 'Web Design',
    description: 'Landing pages, UI/UX design',
    icon: '💻',
    tiers: {
      simple: { label: 'Simple', desc: 'Single landing page, responsive', base: [1000, 2000] },
      standard: { label: 'Standard', desc: 'Multi-page site, custom design', base: [2000, 4000] },
      complex: { label: 'Complex', desc: 'Full web app, e-commerce, complex interactions', base: [4000, 8000] },
    },
  },
};

const TIMELINE_OPTIONS = [
  { key: 'standard', label: 'Standard', desc: '4-5 days', multiplier: 1 },
  { key: 'rush', label: 'Rush', desc: '3-5 days', multiplier: 1.3 },
  { key: 'urgent', label: 'Urgent', desc: '1-2 days', multiplier: 1.5 },
];

const EXTRAS = [
  { key: 'source', label: 'Source files included', multiplier: 0.15 },
  { key: 'revisions', label: 'Extra revisions (beyond 2 rounds)', multiplier: 0.10 },
  { key: 'sound', label: 'Sound design / music', multiplier: 0.10 },
];

const USD_RATE = 3.1; // ~3.1 TND per USD

export default function QuoteEstimatorWindow({ onOpenWindow }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(null);
  const [tier, setTier] = useState(null);
  const [timeline, setTimeline] = useState('standard');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [currency, setCurrency] = useState('tnd');

  const estimate = useMemo(() => {
    if (!service || !tier) return null;
    const pricing = PRICING[service].tiers[tier];
    const [min, max] = pricing.base;
    let multiplier = TIMELINE_OPTIONS.find(t => t.key === timeline)?.multiplier || 1;
    let extrasMultiplier = 1;
    selectedExtras.forEach(key => {
      const extra = EXTRAS.find(e => e.key === key);
      if (extra) extrasMultiplier += extra.multiplier;
    });
    const finalMin = Math.round(min * multiplier * extrasMultiplier);
    const finalMax = Math.round(max * multiplier * extrasMultiplier);
    return { min: finalMin, max: finalMax };
  }, [service, tier, timeline, selectedExtras]);

  const toggleExtra = (key) => {
    setSelectedExtras(prev =>
      prev.includes(key) ? prev.filter(e => e !== key) : [...prev, key]
    );
  };

  const formatPrice = (tnd) => {
    if (currency === 'usd') return `$${Math.round(tnd / USD_RATE)}`;
    return `${tnd.toLocaleString()} TND`;
  };

  const canNext = () => {
    if (step === 0) return service !== null;
    if (step === 1) return tier !== null;
    if (step === 2) return timeline !== null;
    return true;
  };

  const handleSaveQuote = () => {
    if (!estimate || !service || !tier) return;
    const svc = PRICING[service];
    const t = svc.tiers[tier];
    const tl = TIMELINE_OPTIONS.find(x => x.key === timeline);
    const extrasList = selectedExtras.map(k => EXTRAS.find(e => e.key === k)?.label).filter(Boolean);

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const w = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = w - margin * 2;

    // Colors
    const navy = [0, 0, 128];
    const darkNavy = [0, 0, 60];
    const teal = [0, 96, 128];
    const lightGray = [245, 245, 245];
    const medGray = [180, 180, 180];
    const darkGray = [80, 80, 80];

    // Header background
    doc.setFillColor(...navy);
    doc.rect(0, 0, w, 50, 'F');

    // Accent line
    doc.setFillColor(...teal);
    doc.rect(0, 50, w, 3, 'F');

    // Title text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('QUOTE ESTIMATE', margin, 22);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Anoir Cherif — Visual Creator & Motion Designer', margin, 32);

    doc.setFontSize(9);
    doc.setTextColor(180, 200, 220);
    doc.text('www.anoir.space', margin, 42);

    // Date on right
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(dateStr, w - margin, 22, { align: 'right' });

    let y = 62;

    // Service details section
    doc.setFillColor(...lightGray);
    doc.roundedRect(margin, y, contentW, 8, 1, 1, 'F');
    doc.setTextColor(...navy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PROJECT DETAILS', margin + 4, y + 5.5);
    y += 14;

    const addRow = (label, value) => {
      doc.setTextColor(...darkGray);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(label, margin + 4, y);
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(value, margin + 50, y);
      y += 7;
    };

    addRow('Service:', svc.label);
    addRow('Complexity:', `${t.label} — ${t.desc}`);
    addRow('Timeline:', `${tl.label} — ${tl.desc}`);
    if (extrasList.length > 0) {
      addRow('Extras:', extrasList.join(', '));
    }

    y += 4;

    // Divider
    doc.setDrawColor(...medGray);
    doc.setLineWidth(0.3);
    doc.line(margin, y, w - margin, y);
    y += 8;

    // Price box
    doc.setFillColor(...navy);
    doc.roundedRect(margin, y, contentW, 32, 2, 2, 'F');

    // Accent stripe on left of price box
    doc.setFillColor(...teal);
    doc.roundedRect(margin, y, 4, 32, 2, 2, 'F');
    doc.rect(margin + 2, y, 2, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('ESTIMATED RANGE', margin + 10, y + 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const priceText = `${formatPrice(estimate.min)} — ${formatPrice(estimate.max)}`;
    doc.text(priceText, w / 2, y + 22, { align: 'center' });

    y += 42;

    // Disclaimer
    doc.setFillColor(255, 253, 230);
    doc.roundedRect(margin, y, contentW, 14, 1, 1, 'F');
    doc.setDrawColor(220, 200, 100);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, 14, 1, 1, 'S');
    doc.setTextColor(120, 100, 30);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.text('This is an estimated range. Final pricing depends on project scope and requirements.', w / 2, y + 6, { align: 'center' });
    doc.text('Valid for 30 days from date of issue.', w / 2, y + 11, { align: 'center' });

    y += 24;

    // Footer
    doc.setFillColor(...darkNavy);
    doc.rect(0, 270, w, 27, 'F');
    doc.setFillColor(...teal);
    doc.rect(0, 270, w, 1.5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('CONTACT', margin, 278);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(personalInfo.email, margin, 284);
    doc.setFont('helvetica', 'normal');
    doc.text(personalInfo.phone || '', margin, 290);

    doc.setFont('helvetica', 'bold');
    doc.text('anoir.space', w - margin, 284, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Nabeul, Tunisia', w - margin, 290, { align: 'right' });

    // Save
    doc.save(`Anoir_Cherif_Quote_${svc.label.replace(/\s+/g, '_')}.pdf`);
  };

  const steps = [
    { label: 'Service', icon: Sparkles },
    { label: 'Complexity', icon: Layers },
    { label: 'Timeline', icon: Clock },
    { label: 'Extras', icon: Zap },
    { label: 'Estimate', icon: Calculator },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Progress Bar */}
      <div className="shrink-0 border-b border-gray-300 pb-2 mb-2">
        <div className="flex items-center gap-1 mb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded
                ${i <= step ? 'bg-[#000080] text-white' : 'bg-gray-200 text-gray-500'}
                ${i === step ? 'ring-2 ring-blue-300' : ''}
              `}>
                <s.icon size={10} />
                <span className="hidden md:inline">{s.label}</span>
                <span className="md:hidden">{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? 'bg-[#000080]' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 font-mono">
          C:\Quotes\Estimator — Step {step + 1} of {steps.length}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Step 0: Service */}
          {step === 0 && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <h3 className="font-bold text-sm text-gray-900 mb-3">What service do you need?</h3>
              {Object.entries(PRICING).map(([key, svc]) => (
                <button
                  key={key}
                  onClick={() => setService(key)}
                  className={`w-full flex items-center gap-3 p-3 border text-left transition-all
                    ${service === key
                      ? 'bg-[#000080]/10 border-[#000080] shadow-md'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm'
                    }`}
                >
                  <span className="text-2xl">{svc.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{svc.label}</div>
                    <div className="text-[11px] text-gray-500">{svc.description}</div>
                  </div>
                  {service === key && (
                    <div className="w-5 h-5 bg-[#000080] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 1: Complexity */}
          {step === 1 && service && (
            <motion.div
              key="tier"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <h3 className="font-bold text-sm text-gray-900 mb-1">How complex is your project?</h3>
              <p className="text-[11px] text-gray-500 mb-3">{PRICING[service].description}</p>
              {Object.entries(PRICING[service].tiers).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTier(key)}
                  className={`w-full flex items-center justify-between p-3 border text-left transition-all
                    ${tier === key
                      ? 'bg-[#000080]/10 border-[#000080] shadow-md'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm'
                    }`}
                >
                  <div>
                    <div className="font-bold text-sm">{t.label}</div>
                    <div className="text-[11px] text-gray-500">{t.desc}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-xs font-bold text-[#000080]">
                      {formatPrice(t.base[0])} — {formatPrice(t.base[1])}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 2: Timeline */}
          {step === 2 && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <h3 className="font-bold text-sm text-gray-900 mb-3">When do you need it?</h3>
              {TIMELINE_OPTIONS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTimeline(t.key)}
                  className={`w-full flex items-center justify-between p-3 border text-left transition-all
                    ${timeline === t.key
                      ? 'bg-[#000080]/10 border-[#000080] shadow-md'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm'
                    }`}
                >
                  <div>
                    <div className="font-bold text-sm">{t.label}</div>
                    <div className="text-[11px] text-gray-500">{t.desc}</div>
                  </div>
                  <div className="text-xs font-bold text-gray-600">
                    {t.multiplier === 1 ? 'Base price' : `+${Math.round((t.multiplier - 1) * 100)}%`}
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 3: Extras */}
          {step === 3 && (
            <motion.div
              key="extras"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-2"
            >
              <h3 className="font-bold text-sm text-gray-900 mb-3">Any extras? (optional)</h3>
              {EXTRAS.map(e => (
                <button
                  key={e.key}
                  onClick={() => toggleExtra(e.key)}
                  className={`w-full flex items-center gap-3 p-3 border text-left transition-all
                    ${selectedExtras.includes(e.key)
                      ? 'bg-[#000080]/10 border-[#000080] shadow-md'
                      : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm'
                    }`}
                >
                  <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0
                    ${selectedExtras.includes(e.key) ? 'bg-[#000080] border-[#000080]' : 'border-gray-400'}
                  `}>
                    {selectedExtras.includes(e.key) && (
                      <span className="text-white text-xs font-bold">&#10003;</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{e.label}</div>
                  </div>
                  <div className="text-xs font-bold text-gray-500">+{Math.round(e.multiplier * 100)}%</div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Step 4: Estimate */}
          {step === 4 && estimate && (
            <motion.div
              key="estimate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Currency Toggle */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-gray-900">Your Estimate</h3>
                <div className="flex border border-gray-400 text-xs">
                  <button
                    onClick={() => setCurrency('tnd')}
                    className={`px-2 py-0.5 font-bold ${currency === 'tnd' ? 'bg-[#000080] text-white' : 'bg-gray-200'}`}
                  >
                    TND
                  </button>
                  <button
                    onClick={() => setCurrency('usd')}
                    className={`px-2 py-0.5 font-bold ${currency === 'usd' ? 'bg-[#000080] text-white' : 'bg-gray-200'}`}
                  >
                    USD
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-br from-[#000080] to-[#006080] p-6 text-white text-center mb-4 border-2 border-[#000040]">
                <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">Estimated Range</div>
                <div className="text-3xl font-bold font-mono">
                  {formatPrice(estimate.min)} — {formatPrice(estimate.max)}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white border border-gray-300 p-3 mb-4 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-bold">{PRICING[service].icon} {PRICING[service].label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Complexity:</span>
                  <span className="font-bold">{PRICING[service].tiers[tier].label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Timeline:</span>
                  <span className="font-bold">{TIMELINE_OPTIONS.find(t => t.key === timeline)?.label} ({TIMELINE_OPTIONS.find(t => t.key === timeline)?.desc})</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Extras:</span>
                    <span className="font-bold">{selectedExtras.map(k => EXTRAS.find(e => e.key === k)?.label).join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-gray-400 text-center mb-4 italic">
                This is an estimated range. Final pricing depends on project scope and requirements.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenWindow && onOpenWindow('contact')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#000080] text-white win95-btn font-bold text-sm hover:bg-[#0000a0]"
                >
                  <Send size={14} />
                  Contact Me
                </button>
                <button
                  onClick={handleSaveQuote}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 win95-btn font-bold text-sm"
                >
                  <Download size={14} />
                  Save Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="shrink-0 border-t border-gray-300 pt-2 mt-2 flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 px-3 py-1 text-xs font-bold win95-btn disabled:opacity-40"
        >
          <ChevronLeft size={12} /> Back
        </button>
        <span className="text-[10px] text-gray-400 font-mono">
          {step + 1}/{steps.length}
        </span>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext()}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-[#000080] text-white win95-btn disabled:opacity-40 hover:bg-[#0000a0]"
          >
            Next <ChevronRight size={12} />
          </button>
        ) : (
          <div className="w-[60px]" />
        )}
      </div>
    </div>
  );
}
