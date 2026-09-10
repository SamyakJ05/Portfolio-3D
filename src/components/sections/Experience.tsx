import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Where I've <span className="text-hologram">Built & Scaled</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            Production engineering across tier-1 financial infrastructure, generative AI pipelines, and distributed cloud microservices.
          </p>
        </div>

        {/* Desktop / Tablet Timeline & Tabbed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            {experience.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    soundFx.playClick();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`cursor-pointer p-5 rounded-2xl transition-all border ${
                    isActive
                      ? 'bg-[#101b30] border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-lg text-white">
                      {item.company}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {item.period.split('–')[0]}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-gray-300 mb-2 font-medium">
                    {item.role}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Experience Details Card */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-[#0c1424]/90 shadow-2xl relative">
              {/* Header Info */}
              <div className="border-b border-white/10 pb-6 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {experience[activeTab].role}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {experience[activeTab].period}
                  </span>
                </div>
                <div className="text-sm font-mono text-cyan-300 font-semibold mb-2">
                  {experience[activeTab].company} &nbsp;·&nbsp; {experience[activeTab].location}
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  {experience[activeTab].summary}
                </p>
              </div>

              {/* Bullets List */}
              <div className="space-y-3.5 mb-8">
                {experience[activeTab].bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    <p className="text-sm text-gray-200 font-sans leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2.5">
                  Core Technologies Deployed
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience[activeTab].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
