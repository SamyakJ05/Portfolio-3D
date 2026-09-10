import React from 'react';
import { ArrowUp, Heart, Terminal, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

export const Footer: React.FC<{ onOpenTerminal: () => void }> = ({ onOpenTerminal }) => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    soundFx.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#04060a] py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-display font-black text-cyan-300 text-sm">
                SJ
              </div>
              <span className="font-display font-bold text-lg text-white">
                Samyak Jain
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Software Engineer @ UBS &nbsp;·&nbsp; Amazon AIdeaS 2026 Innovation Category Winner
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-gray-400">
            <a href="#hero" className="hover:text-cyan-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-300 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#awards" className="hover:text-cyan-300 transition-colors">Awards</a>
            <a href="#freelance" className="hover:text-cyan-300 transition-colors">Hire Me</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>

          {/* Top & CLI Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 border border-white/10 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-300 border border-white/10 transition-all"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-500 gap-4">
          <div>
            &copy; 2026 Samyak Jain &nbsp;·&nbsp; Crafted with React 19 &amp; Three.js
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for select freelance
            </span>
            <span>·</span>
            <a
              href="https://samyak.space"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 underline"
            >
              Original Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
