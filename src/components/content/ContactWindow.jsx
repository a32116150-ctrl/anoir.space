import React, { useState, useCallback } from 'react';
import { personalInfo } from '../../data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ExternalLink, Zap } from 'lucide-react';

function Win95Input({ label, type = 'text', value, onChange, placeholder, required, name }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold mb-1 text-gray-800">{label}{required && <span className="text-red-600">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-2 py-1.5 text-sm bg-white border-2 border-gray-500 shadow-win-in focus:border-[#000080] focus:outline-none transition-colors"
      />
    </div>
  );
}

function Win95Select({ label, value, onChange, options, required, name }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold mb-1 text-gray-800">{label}{required && <span className="text-red-600">*</span>}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-2 py-1.5 text-sm bg-white border-2 border-gray-500 shadow-win-in focus:border-[#000080] focus:outline-none transition-colors cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function Win95Textarea({ label, value, onChange, placeholder, required, name, rows = 4 }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold mb-1 text-gray-800">{label}{required && <span className="text-red-600">*</span>}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-2 py-1.5 text-sm bg-white border-2 border-gray-500 shadow-win-in focus:border-[#000080] focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}

export default function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'freelance',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [activeTab, setActiveTab] = useState('form'); // form, info

  const subjectOptions = [
    { value: 'freelance', label: 'Freelance Project' },
    { value: 'fulltime', label: 'Full-time Position' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const subject = subjectOptions.find(o => o.value === formData.subject)?.label || 'Portfolio Inquiry';
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subject}\n\nMessage:\n${formData.message}`;
      
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      }, 1000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }, [formData]);

  const tabs = [
    { key: 'form', label: '✉️ Send Message' },
    { key: 'info', label: '📋 Contact Info' },
  ];

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
      {/* Availability Banner */}
      <motion.div
        className="bg-green-100 border border-green-400 px-3 py-1.5 flex items-center gap-2 mb-2 shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Zap size={14} className="text-green-600 shrink-0" />
        <span className="text-xs text-green-800 font-bold">🟢 Available for hire — Typical response time: 24-48 hours</span>
      </motion.div>

      {/* Tab Bar */}
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
        <AnimatePresence mode="wait">
          {activeTab === 'form' && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <fieldset className="border border-white shadow-win-in p-3 mb-3">
                <legend className="text-xs px-1 font-bold">📧 New Message</legend>

                <Win95Input label="Your Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                <Win95Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required />
                <Win95Select label="Subject" name="subject" value={formData.subject} onChange={handleChange} options={subjectOptions} required />
                <Win95Textarea label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project, timeline, and budget..." required rows={4} />
              </fieldset>

              {/* Submit Button */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2 px-4 py-1.5 bg-[#000080] text-white border-2 border-white shadow-win-out active:shadow-win-in text-sm font-bold hover:bg-[#0000a0] transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  <Send size={14} />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-green-700 text-xs font-bold">
                      <CheckCircle size={14} /> Message prepared! Check your email client.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-red-700 text-xs font-bold">
                      <AlertCircle size={14} /> Something went wrong. Try emailing directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          )}

          {activeTab === 'info' && (
            <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <fieldset className="border border-white shadow-win-in p-3 mb-3">
                <legend className="text-xs px-1 font-bold">📋 Direct Contact</legend>
                <div className="space-y-3">
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 transition-colors group">
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center border border-gray-500 shadow-sm group-hover:border-blue-500 shrink-0">
                      <Mail size={20} className="text-[#000080]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold">Email</div>
                      <div className="text-sm text-blue-800 underline">{personalInfo.email}</div>
                    </div>
                  </a>

                  <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 p-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 transition-colors group">
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center border border-gray-500 shadow-sm group-hover:border-blue-500 shrink-0">
                      <Phone size={20} className="text-[#000080]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold">Phone</div>
                      <div className="text-sm text-gray-800">{personalInfo.phone}</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-2">
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center border border-gray-500 shadow-sm shrink-0">
                      <MapPin size={20} className="text-[#000080]" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-bold">Location</div>
                      <div className="text-sm text-gray-800">{personalInfo.location}</div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="border border-white shadow-win-in p-3">
                <legend className="text-xs px-1 font-bold">🌐 Social Links</legend>
                <div className="grid grid-cols-2 gap-2">
                  {personalInfo.socials.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 text-sm hover:bg-[#000080] hover:text-white border border-transparent hover:border-[#000080] transition-colors font-bold">
                      <social.icon size={16} />
                      {social.name}
                      <ExternalLink size={10} className="ml-auto opacity-50" />
                    </a>
                  ))}
                </div>
              </fieldset>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
