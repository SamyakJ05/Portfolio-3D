import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Sparkles, ArrowRight, BrainCircuit, CloudLightning, ServerCog, Workflow, BookOpenCheck, CodeXml, Mail } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit,
  CloudLightning,
  ServerCog,
  Workflow,
  BookOpenCheck,
  CodeXml,
};

export const Freelance: React.FC = () => {
  const { freelanceServices, personal } = PORTFOLIO_DATA;

  return (
    <section id="freelance" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available For Hire</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Let's Build Something <span className="text-hologram">Extraordinary</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            I take on a limited number of high-impact freelance and advisory projects alongside my full-time work. If you need sharp cloud architecture, generative AI systems, or full-stack engineering:
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {freelanceServices.map((service, i) => {
            const Icon = ICON_MAP[service.iconName] || BrainCircuit;
            return (
              <div
                key={i}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big CTA Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-cyan-500/30 bg-gradient-to-r from-[#0d1627]/90 via-[#0a1120]/90 to-[#070d18]/90 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
            Have an ambitious project in mind?
          </h3>
          <p className="text-gray-300 font-sans text-sm sm:text-base max-w-lg mx-auto mb-8">
            From zero-to-one AI MVPs to enterprise-grade cloud transformations, I typically reply within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personal.email}?subject=Freelance%20Project%20Inquiry%20from%203D%20Portfolio`}
              onClick={() => soundFx.playWarp()}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-display font-bold text-sm hover:opacity-95 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch →</span>
            </a>
            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/15 transition-all"
            >
              Fill Contact Form
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
