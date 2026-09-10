import React from 'react';
import { Trophy, ArrowRight, ExternalLink, Sparkles, Terminal, Code2 } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface HeroProps {
  accentColor: string;
  isHighQuality: boolean;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  accentColor,
  isHighQuality,
  onOpenTerminal,
}) => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid"
    >
      {/* 3D WebGL Background Scene */}
      <HeroScene accentColor={accentColor} isHighQuality={isHighQuality} />

      {/* Foreground Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-6 pointer-events-auto backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Open for select freelance & AI engineering projects</span>
        </div>

        {/* Amazon AIdeaS Global Winner Accolade Pill */}
        <div className="mb-6 pointer-events-auto">
          <a
            href={personal.socials.awsArticle}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ff9900]/10 border border-[#ff9900]/40 text-[#ffb84d] text-xs font-mono hover:bg-[#ff9900]/20 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,153,0,0.2)]"
          >
            <Trophy className="w-3.5 h-3.5 text-[#ff9900]" />
            <span className="font-bold">Amazon AIdeaS 2026 Winner</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-300">Innovation Category (RetainIQ)</span>
            <ExternalLink className="w-3 h-3 text-[#ff9900] opacity-80" />
          </a>
        </div>

        {/* Hero Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight mb-4 drop-shadow-2xl">
          <span className="text-white">Samyak</span>{' '}
          <span className="text-hologram">Jain</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl font-mono text-cyan-300/90 mb-6 font-medium">
          Software Engineer @ <span className="text-white font-bold">UBS</span> &nbsp;·&nbsp; Building <span className="text-white font-bold">RetainIQ</span> &nbsp;·&nbsp; PGDM Finance @ <span className="text-white font-bold">XLRI</span>
        </p>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-gray-300 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
          Building cloud-native systems by day.<br />
          <em className="text-cyan-300 font-normal italic font-mono">Shipping AI products at night.</em>
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto mb-14">
          <a
            href="#projects"
            onClick={() => soundFx.playWarp()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-[#05080c] font-display font-bold text-sm hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 transition-all"
          >
            <span>Explore 3D Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#freelance"
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-display font-semibold text-sm border border-white/15 backdrop-blur-md hover:border-cyan-400/50 transition-all"
          >
            <span>Work With Me</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </a>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-gray-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Launch CLI</span>
          </button>
        </div>

        {/* Floating KPI Stat Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pointer-events-auto">
          {personal.metrics.map((metric, i) => (
            <div
              key={i}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel p-4 rounded-xl text-left glass-panel-hover"
            >
              <div className="text-xs font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>{metric.label}</span>
                <Code2 className="w-3 h-3 text-cyan-400/60" />
              </div>
              <div className="text-lg font-display font-bold text-white mb-0.5">
                {metric.value}
              </div>
              <div className="text-[11px] font-sans text-cyan-300/80">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
