import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Sparkles, Menu, X, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  activeTheme: string;
  onThemeChange: (theme: string) => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  isHighQuality: boolean;
  onToggleQuality: () => void;
  onOpenTerminal: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#awards' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hire Me', href: '#freelance' },
  { label: 'Contact', href: '#contact' },
];

const THEMES = [
  { id: 'teal', label: 'Teal', color: '#4f98a3' },
  { id: 'cyan', label: 'Cyan', color: '#00f0ff' },
  { id: 'violet', label: 'Violet', color: '#a78bfa' },
  { id: 'amber', label: 'Amber', color: '#f59e0b' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTheme,
  onThemeChange,
  isAudioEnabled,
  onToggleAudio,
  isHighQuality,
  onToggleQuality,
  onOpenTerminal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#05080c]/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => soundFx.playClick()}
          className="group flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center font-display font-black text-cyan-300 text-lg shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            SJ
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-display font-bold text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors">
              Samyak Jain
            </div>
            <div className="text-[11px] font-mono text-gray-400">
              Software Engineer @ UBS
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f172a]/60 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => soundFx.playHover()}
              className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Tools: Terminal, Theme Swatches, Audio, Quality */}
        <div className="flex items-center gap-2">
          {/* Terminal Launcher */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-cyan-300 hover:border-cyan-400/50 transition-all shadow-inner"
            title="Open Interactive Cyber Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLI</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              soundFx.playClick();
            }}
            className={`p-2 rounded-lg border transition-all ${
              isAudioEnabled
                ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title={isAudioEnabled ? 'Mute Procedural Synth' : 'Enable Procedural Synth'}
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 3D Performance Quality Toggle */}
          <button
            onClick={() => {
              onToggleQuality();
              soundFx.playClick();
            }}
            className={`p-2 rounded-lg border transition-all ${
              isHighQuality
                ? 'bg-purple-500/10 border-purple-400/50 text-purple-300'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
            title={isHighQuality ? '3D High Performance Mode' : '3D Lite Mode'}
          >
            <Cpu className="w-4 h-4" />
          </button>

          {/* Theme Palette Swatches */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/30 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-gray-400 mr-1" />
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  soundFx.playClick();
                  onThemeChange(th.id);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  activeTheme === th.id
                    ? 'ring-2 ring-white scale-125'
                    : 'opacity-60 hover:opacity-100 hover:scale-110'
                }`}
                style={{ backgroundColor: th.color }}
                title={`Switch to ${th.label} accent`}
              />
            ))}
          </div>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f18]/95 border-b border-white/10 px-6 py-4 space-y-3 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-300 hover:text-cyan-300 py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-mono text-cyan-300"
            >
              <Terminal className="w-4 h-4" /> Launch Interactive CLI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
