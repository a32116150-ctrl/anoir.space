# anoir.space — Portfolio Upgrade Instructions

> **IMPORTANT**: This document is a complete, self-contained guide for an AI coding agent to transform the anoir.space portfolio website. Execute tasks in the order listed (P0 → P1 → P2 → P3). Each task includes exact file paths, code changes, and verification steps.

---

## Project Context

- **Project Root**: `/Users/anoircherif/Desktop/dev project/anoir.space`
- **Stack**: React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion 10 + Lucide React icons
- **Concept**: Windows 95 desktop simulation serving as a creative portfolio
- **Domain**: https://anoir.space (deployed on Vercel)
- **Key Files**:
  - Entry: `index.html` → `src/main.jsx` → `src/App.jsx`
  - Data: `src/data/content.js` (all portfolio content)
  - Context: `src/context/SystemContext.jsx` (global state)
  - Components: `src/components/` (9 shell components + `content/` subfolder with 22 window components)
  - Styles: `src/index.css` + `tailwind.config.js`
  - Config: `vite.config.js`, `package.json`, `vercel.json`

---

## Pre-Execution Setup

Before starting any changes, run:

```bash
cd "/Users/anoircherif/Desktop/dev project/anoir.space"
npm install
npm run dev
```

Verify the dev server starts without errors. Keep it running throughout.

---

# ═══════════════════════════════════════════
# PHASE 0 (P0) — CRITICAL FIXES
# ═══════════════════════════════════════════

---

## TASK P0-1: Add OG Image & Professional Favicon

### Step 1: Create favicon assets
Create a proper favicon. Generate a simple, bold "AC" monogram or creative icon.

Create file `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#000080"/>
  <text x="16" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#00ffff">AC</text>
</svg>
```

### Step 2: Create OG image placeholder
Create file `public/og-image.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#000080"/>
  <rect x="40" y="40" width="1120" height="550" rx="0" fill="#c0c0c0" stroke="#ffffff" stroke-width="3"/>
  <rect x="44" y="44" width="1112" height="30" fill="#000080"/>
  <text x="56" y="65" font-family="Arial, sans-serif" font-size="14" fill="white" font-weight="bold">Anoir Cherif — Portfolio</text>
  <text x="600" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" fill="#000080" font-weight="bold">Anoir Cherif</text>
  <text x="600" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#008080">Visual Creator &amp; Motion Designer</text>
  <text x="600" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#808080">7+ Years · 50+ Projects · 20+ Clients</text>
  <text x="600" y="520" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#000080">anoir.space</text>
</svg>
```

### Step 3: Update index.html
Edit `index.html`. Replace the favicon line and add OG image tags.

**Find** (line 26):
```html
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>" />
```

**Replace with**:
```html
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
```

**Find** (after the twitter:description meta, around line 23):
```html
    <meta name="twitter:description" content="Interactive portfolio showcasing 7+ years of motion design, video editing, and branding work." />
```

**Add after it**:
```html
    <meta property="og:image" content="https://anoir.space/og-image.svg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:image" content="https://anoir.space/og-image.svg" />
```

### Step 4: Add DNS prefetch for YouTube
**Find** in `index.html` (before the fonts section, around line 50):
```html
    <!-- Fonts -->
```

**Add before it**:
```html
    <!-- Performance: DNS Prefetch -->
    <link rel="dns-prefetch" href="https://img.youtube.com" />
    <link rel="dns-prefetch" href="https://www.youtube.com" />
    
```

### Verification:
- Check that `/favicon.svg` loads in browser
- Check that OG tags are present in page source

---

## TASK P0-2: Rebuild ContactWindow as a Conversion Machine

### Step 1: Replace `src/components/content/ContactWindow.jsx`

**Overwrite the entire file** with:

```jsx
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
  const [status, setStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('form');

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
    { key: 'form', label: 'Send Message' },
    { key: 'info', label: 'Contact Info' },
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
        <span className="text-xs text-green-800 font-bold">Available for hire — Typical response time: 24-48 hours</span>
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
                <legend className="text-xs px-1 font-bold">New Message</legend>

                <Win95Input label="Your Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                <Win95Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required />
                <Win95Select label="Subject" name="subject" value={formData.subject} onChange={handleChange} options={subjectOptions} required />
                <Win95Textarea label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project, timeline, and budget..." required rows={4} />
              </fieldset>

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
                <legend className="text-xs px-1 font-bold">Direct Contact</legend>
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
                <legend className="text-xs px-1 font-bold">Social Links</legend>
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
```

### Step 2: Update Window dimensions in App.jsx
In `src/App.jsx`, find:
```js
  contact: { title: 'Contact Info', component: ContactWindow, width: 420, height: 350 },
```
Replace with:
```js
  contact: { title: 'Contact — Anoir Cherif', component: ContactWindow, width: 480, height: 520 },
```

### Verification:
- Open the Contact window — should show tabs, form fields, availability banner
- Submit the form — should open mailto with pre-filled data
- Switch to "Contact Info" tab — should show clickable email/phone/location + social links

---

## TASK P0-3: Expand ServicesWindow with Descriptions & CTAs

### Step 1: Replace `src/components/content/ServicesWindow.jsx`

**Overwrite the entire file** with:

```jsx
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
              <p className="text-sm text-gray-700 mt-2 mb-3 leading-relaxed">{service.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onContact(service.name); }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-[#000080] text-white border-2 border-white shadow-win-out active:shadow-win-in text-xs font-bold hover:bg-[#0000a0] transition-colors"
                >
                  <Mail size={12} /> Request Quote
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
    if (onOpenWindow) onOpenWindow('contact');
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: 'inherit' }}>
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

      <motion.div className="shrink-0 mt-2 pt-2 border-t border-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <p className="text-[10px] text-gray-400 text-center italic">Custom packages available — Contact me to discuss your project needs</p>
      </motion.div>
    </div>
  );
}
```

### Step 2: Update ServicesWindow dimensions in App.jsx
In `src/App.jsx`, find:
```js
  services: { title: 'Services Palette', component: ServicesWindow, width: 350, height: 400 },
```
Replace with:
```js
  services: { title: 'Services — Anoir Cherif', component: ServicesWindow, width: 450, height: 480 },
```

---

## TASK P0-4: Fix ExperienceWindow — Remove window.prompt() / window.confirm()

### Step 1: Edit `src/components/content/ExperienceWindow.jsx`

**Find** the DraggableIcon's onContextMenu handler (around line 87-94):
```jsx
        onContextMenu={(e) => {
            e.preventDefault();
            // Custom Context Menu logic would go here, using simple prompt for now
            const action = window.prompt(`Options for '${label}':\nType 'copy', 'cut', or 'delete'`, '');
            if (action === 'delete') deleteItem(id);
            if (action === 'copy') handleCopy(id, data, false);
            if (action === 'cut') handleCopy(id, data, true);
        }}
```

**Replace with**:
```jsx
        onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}
```

**Find** the background context menu handler (around line 241-250):
```jsx
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
```

**Replace with**:
```jsx
        onContextMenu={(e) => {
            if (e.target === e.currentTarget) {
                e.preventDefault();
                if (clipboard) {
                    handlePaste();
                }
            }
        }}
```

**Find** the help text (around line 255-258):
```jsx
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 pointer-events-none select-none bg-white/80 px-1">
                Right-click item to Copy/Cut • Right-click background to Paste
            </div>
```
**Replace with**:
```jsx
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-400 pointer-events-none select-none bg-white/80 px-1">
                Double-click to open • Drag items to rearrange
            </div>
```

---

## TASK P0-5: Add SEO Files

### Step 1: Create `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://anoir.space/sitemap.xml
```

### Step 2: Create `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://anoir.space/</loc>
    <lastmod>2026-07-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

# ═══════════════════════════════════════════
# PHASE 1 (P1) — HIGH IMPACT IMPROVEMENTS
# ═══════════════════════════════════════════

---

## TASK P1-1: Lazy Loading & Code Splitting

### Step 1: Create `src/data/settings.js`

First, read `src/components/content/SettingsWindow.jsx` and copy the WALLPAPERS and FONTS exports to a new file. Then update SettingsWindow to import from the new file, and update App.jsx imports accordingly.

Create `src/data/settings.js` containing the WALLPAPERS and FONTS arrays extracted from SettingsWindow.jsx.

### Step 2: Edit `src/App.jsx`

Replace the eager content window imports (lines 14-33) with React.lazy() calls. Keep `AboutWindow` eagerly loaded since it opens on boot. Import `{ WALLPAPERS, FONTS }` from `./data/settings` instead of from SettingsWindow.

Wrap the window Content rendering with `<Suspense>` and a loading spinner fallback.

---

## TASK P1-2: Error Boundaries (BSOD Easter Egg)

### Step 1: Create `src/components/ErrorBoundary.jsx`

```jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Window crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-white font-mono text-sm" style={{ background: '#000080' }}>
          <div className="max-w-md text-center">
            <h2 className="bg-[#c0c0c0] text-[#000080] px-3 py-0.5 inline-block font-bold mb-4">Windows</h2>
            <p className="mb-3 leading-relaxed text-left">A fatal exception has occurred in this window. The current application will be terminated.</p>
            <p className="mb-3 leading-relaxed text-left text-xs opacity-80">* Don't worry — your portfolio is fine. This window just had a bad day.</p>
            <p className="mb-4 text-left">Press any key to restart this window.</p>
            <button onClick={() => this.setState({ hasError: false, error: null })} className="px-4 py-1.5 bg-[#c0c0c0] text-black border-2 border-white shadow-win-out active:shadow-win-in font-bold text-xs hover:bg-gray-300 transition-colors">
              Press to Restart Window
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Step 2: Import and wrap window content in App.jsx
Wrap each window's content in `<ErrorBoundary>` inside the Window component rendering.

---

## TASK P1-3: Keyboard Shortcuts

### Step 1: Add keyboard event handler in `src/App.jsx`

Add a useEffect after existing ones:
- `Escape` → close active window
- `Alt+Tab` → cycle through open windows

---

## TASK P1-4: Reduce Boot Screen Duration

### Step 1: Edit `src/components/content/BootScreen.jsx`

Reduce all BOOT_LINES delays by ~40% (compress from 3400ms total to ~2000ms).
Reduce the logo phase timer from 3800ms to 2200ms.
Reduce the complete timer from 5200ms to 3400ms.

---

## TASK P1-5: Vite Build Optimization

### Step 1: Edit `vite.config.js`

Add manual chunks splitting: `vendor-react`, `vendor-motion`, `vendor-icons`.
Add terser minification with `drop_console: true` for production.

---

## TASK P1-6: Accessibility — Reduced Motion & ARIA Labels

### Step 1: Add to `src/index.css`
Add `@media (prefers-reduced-motion: reduce)` rules to disable animations.

### Step 2: Add ARIA labels to `src/components/Window.jsx`
Add `aria-label` to minimize, maximize, close buttons.
Add `role="dialog"` and `aria-label={title}` to the window container.

---

# ═══════════════════════════════════════════
# PHASE 2 (P2) — POLISH & CONTENT
# ═══════════════════════════════════════════

---

## TASK P2-1: Add "Process" Window — How I Work

### Step 1: Create `src/components/content/ProcessWindow.jsx`
A 5-step wizard showing: Discovery, Concept, Design, Review, Delivery.
Each step has icon, description, deliverables list, and duration estimate.
Styled as a Win95 "Setup Wizard" with progress bar and navigation.

### Step 2: Register in App.jsx WINDOW_COMPONENTS
### Step 3: Add to SystemContext desktop items
### Step 4: Add to StartMenu program items

---

## TASK P2-2: Enhanced Structured Data (SEO)

### Step 1: Edit `index.html`
Expand the JSON-LD schema with `knowsAbout`, `hasOccupation`, and `image` fields.

---

## TASK P2-3: VideoLibrary Image Optimization

### Step 1: Edit `src/components/content/VideoLibraryWindow.jsx`
Add `width="320"`, `height="180"`, and `decoding="async"` attributes to YouTube thumbnail images.
Update `alt` text to be more descriptive.

---

# ═══════════════════════════════════════════
# PHASE 3 (P3) — UI/UX POLISH (COMPLETED)
# ═══════════════════════════════════════════

---

## TASK P3-1: Window Visual Polish — COMPLETED

### Changes made to `src/components/Window.jsx`:
- **Layered 3D shadows**: Active windows get `win95-border-out` with `shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]` for depth
- **Active window glow**: Inactive windows get subtle shadow, active windows get cyan glow `shadow-[0_0_12px_2px_rgba(0,0,128,0.15)]`
- **Spring animation**: Window open/close uses `type: 'spring', stiffness: 400, damping: 30` for satisfying overshoot
- **Minimize animation**: Windows animate `scale(0.3) + translateY(200px)` with `easeIn` over 200ms
- **Drag feedback**: Window opacity drops to 0.9 while dragging for visual feedback
- **Win95 button style**: All title bar buttons use `.win95-btn` class with authentic 3D border effect
- **Responsive touch targets**: Buttons are `w-5 h-5` on mobile, `w-6 h-6` on desktop

---

## TASK P3-2: Desktop Icon Polish — COMPLETED

### Changes made to `src/components/DesktopIcon.jsx`:
- **Double-click flash**: Icons flash blue (`icon-flash` animation) on open for Win95 authenticity
- **Selection glow**: Selected icons pulse with `selection-glow` animation
- **Tooltip on hover**: Win95-style yellow tooltip follows cursor on desktop (hidden on mobile)
- **Larger touch targets**: Icons are `w-24 min-h-[80px]` on mobile, `w-28` on desktop
- **Smooth hover**: `transition-all duration-75` for subtle hover feedback

---

## TASK P3-3: Taskbar Polish — COMPLETED

### Changes made to `src/components/Taskbar.jsx`:
- **Active button "pressed in"**: Uses `.taskbar-btn-active` class with inset border/shadow
- **Inactive button 3D**: Uses `.taskbar-btn-inactive` class with raised border
- **Tooltip on hover**: Window title tooltip appears above taskbar buttons
- **Start button**: Uses `.win95-btn` class for authentic 3D press effect
- **Safe area**: Bottom padding for iPhone notch/Dynamic Island
- **Mobile notification**: Win95-styled buttons in notification popup

---

## TASK P3-4: Start Menu Polish — COMPLETED

### Changes made to `src/components/StartMenu.jsx`:
- **Hover transitions**: `transition-colors duration-75` on all menu items for smooth feedback
- **Submenu positioning**: Opens upward (`bottom-full`) on mobile, right (`left-full`) on desktop

---

## TASK P3-5: Context Menu Polish — COMPLETED

### Changes made to `src/components/ContextMenu.jsx`:
- **Authentic scale-in**: `scale: 0.92 → 1` over 120ms for Win95 feel
- **3D border**: Uses `.win95-border-out` class with layered shadow
- **Hover transition**: `transition-colors duration-75` on menu items
- **Larger padding**: `py-1.5` for better click targets

---

## TASK P3-6: Global CSS Polish — COMPLETED

### Changes made to `src/index.css`:
- **CRT scanline effect**: Subtle horizontal lines via `::before` pseudo-element on `.crt-effect`
- **Cursor trail**: Cyan pixelated cursor trail dots that fade out (desktop only)
- **Window animations**: `window-open` spring, `window-minimize` shrink, `icon-flash` blue flash
- **Selection glow**: Pulsing blue outline for selected icons
- **Win95 tooltips**: Yellow background, black border, pixel font styling
- **3D button classes**: `.win95-btn` with authentic border colors and active state
- **3D border classes**: `.win95-border-out` and `.win95-border-in` for window frames
- **Taskbar button classes**: `.taskbar-btn-active` (pressed) and `.taskbar-btn-inactive` (raised)
- **Safe area support**: `@supports` block for iPhone notch padding
- **Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce`

---

## TASK P3-7: App-Level Polish — COMPLETED

### Changes made to `src/App.jsx`:
- **Cursor trail effect**: Desktop-only cyan cursor trail (40ms throttle, 400ms fade)
- **CRT overlay**: Main container uses `.crt-effect` class for scanline overlay
- **Reduced motion**: Cursor trail and selection glow disabled for accessibility

---

## TASK P3-8: Clippy Easter Egg

### Step 1: Create `src/components/Clippy.jsx`
A paperclip assistant that appears after 30 seconds with random portfolio tips.
Auto-dismisses after 12 seconds. Has "Thanks!" and "Don't show again" buttons.

### Step 2: Import and render in App.jsx (only after boot completed)

---

## TASK P3-9: Konami Code Easter Egg

### Step 1: Add keydown listener in App.jsx
Listen for ↑↑↓↓←→←→BA sequence, then trigger confetti particles.

### Step 2: Add `@keyframes confetti-fall` animation to `src/index.css`

---

# ═══════════════════════════════════════════
# PHASE 4 (P4) — MOBILE UX (COMPLETED)
# ═══════════════════════════════════════════

---

## TASK P4-1: Auto-Maximize Windows on Mobile — COMPLETED

### Changes made to `src/components/Window.jsx`:
- `isMaximized` initializes to `isMobile` (true on phones)
- `useEffect` force-maximizes if `isMobile` changes to true
- Maximized windows: `top: 0, left: 0, width: 100vw, height: calc(100dvh - 48px)`
- Removed conflicting `useEffect` that was setting 90%/70% size

---

## TASK P4-2: Single-Tap Icons on Mobile — COMPLETED

### Changes made to `src/components/DesktopIcon.jsx`:
- Mobile detection via `window.innerWidth < 768`
- Single tap opens window on mobile (bypasses double-click requirement)
- Double-click flash animation on both mobile and desktop

---

## TASK P4-3: Start Menu Submenu Overflow — COMPLETED

### Changes made to `src/components/StartMenu.jsx`:
- Mobile: submenu opens upward (`bottom-full, left-0`) to stay visible
- Desktop: submenu opens right (`left-full, bottom-0`) as before
- Uses `md:` Tailwind prefix for responsive breakpoint

---

## TASK P4-4: Taskbar Touch Scroll — COMPLETED

### Changes made to `src/components/Taskbar.jsx`:
- Added `touch-pan-x` for smooth horizontal swiping on mobile
- `no-scrollbar` class hides scrollbars cleanly

---

## TASK P4-5: Top Menu Bar Removed — COMPLETED

### Changes made to `src/App.jsx`:
- Removed `<MenuBar>` component import and render
- Desktop now fills full viewport height

---

# ═══════════════════════════════════════════
# FINAL VERIFICATION CHECKLIST
# ═══════════════════════════════════════════

```bash
cd "/Users/anoircherif/Desktop/dev project/anoir.space"
npm run build
npm run preview
```

### Manual Checks:
- [ ] Boot screen loads and completes in ~3.5 seconds
- [ ] About window auto-opens after boot
- [ ] All desktop icons open their respective windows
- [ ] Contact window has form + info tabs + availability banner
- [ ] Services window shows expandable cards with descriptions
- [ ] "How I Work" window shows 5-step process wizard
- [ ] Experience window has NO window.prompt() dialogs
- [ ] Escape key closes active window
- [ ] Alt+Tab cycles windows
- [ ] Clippy appears after 30 seconds
- [ ] Konami code triggers confetti
- [ ] Error boundary catches crashes (BSOD screen)
- [ ] favicon.svg loads in browser tab
- [ ] robots.txt and sitemap.xml are accessible
- [ ] No console errors in production build
- [ ] npm run build output shows separate vendor chunks

### UI/UX Checks:
- [ ] Active windows have blue glow border, inactive windows are muted
- [ ] Window open animation has spring overshoot feel
- [ ] Window minimize animates shrinking down
- [ ] Dragging a window reduces opacity slightly
- [ ] Title bar buttons have 3D press effect (border inverts on click)
- [ ] Desktop icons flash blue on double-click
- [ ] Selected desktop icons have pulsing glow outline
- [ ] Hovering desktop icons shows yellow Win95 tooltip
- [ ] Taskbar buttons show "pressed in" for active window
- [ ] Taskbar buttons show tooltip with window title on hover
- [ ] Context menu scales in with authentic Win95 timing
- [ ] Start menu items have smooth color transition on hover
- [ ] Cursor trail (cyan dots) follows mouse on desktop
- [ ] CRT scanline overlay is subtle but visible
- [ ] Mobile: windows auto-maximize with title bar visible
- [ ] Mobile: single tap opens icons
- [ ] Mobile: Start menu submenus don't overflow off-screen
- [ ] Mobile: taskbar scrolls horizontally with touch

---

## File Summary

| Action | File | Description |
|---|---|---|
| MODIFY | `index.html` | Favicon, OG image, DNS prefetch, structured data |
| MODIFY | `src/App.jsx` | Lazy loading, error boundaries, keyboard shortcuts, Clippy, Konami, cursor trail, CRT |
| MODIFY | `src/index.css` | Animations, CRT effect, cursor trail, Win95 classes, safe areas, reduced motion |
| MODIFY | `src/components/Window.jsx` | 3D shadows, active glow, spring animation, minimize anim, drag feedback |
| MODIFY | `src/components/DesktopIcon.jsx` | Flash, glow, tooltip, responsive touch targets |
| MODIFY | `src/components/Taskbar.jsx` | Active button glow, tooltip, safe area |
| MODIFY | `src/components/StartMenu.jsx` | Hover transitions, responsive submenu |
| MODIFY | `src/components/ContextMenu.jsx` | Authentic scale-in, 3D border |
| MODIFY | `src/components/content/ContactWindow.jsx` | Full rewrite — form, tabs, availability |
| MODIFY | `src/components/content/ServicesWindow.jsx` | Full rewrite — expandable cards, CTAs |
| MODIFY | `src/components/content/ExperienceWindow.jsx` | Remove window.prompt/confirm |
| MODIFY | `src/components/content/BootScreen.jsx` | Faster boot timing |
| MODIFY | `src/components/content/VideoLibraryWindow.jsx` | Image optimization attrs |
| MODIFY | `src/context/SystemContext.jsx` | Add process desktop item |
| MODIFY | `src/components/StartMenu.jsx` | Add "How I Work" menu item |
| MODIFY | `vite.config.js` | Bundle splitting, terser minification |
| NEW | `src/components/content/ProcessWindow.jsx` | Creative process wizard |
| NEW | `src/components/ErrorBoundary.jsx` | BSOD error boundary |
| NEW | `src/components/Clippy.jsx` | Clippy assistant easter egg |
| NEW | `src/data/settings.js` | Extracted WALLPAPERS/FONTS constants |
| NEW | `public/favicon.svg` | Professional favicon |
| NEW | `public/og-image.svg` | Social sharing image |
| NEW | `public/robots.txt` | Search engine directives |
| NEW | `public/sitemap.xml` | Search engine sitemap |
