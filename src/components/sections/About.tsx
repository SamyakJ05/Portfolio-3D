import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SkillsConstellation } from '../3d/SkillsConstellation';
import { soundFx } from '../../utils/audio';
import { CheckCircle2, Award, BookOpen, Layers } from 'lucide-react';

interface AboutProps {
  accentColor: string;
}

export const About: React.FC<AboutProps> = ({ accentColor }) => {
  const { personal, skills, education } = PORTFOLIO_DATA;
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Architect & Builder Profile</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
            Engineering at the Intersection of <span className="text-hologram">Cloud & AI</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed font-sans">
            {personal.shortBio}
          </p>
        </div>

        {/* 3D Skills Constellation + Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* 3D Constellation Sphere */}
          <div className="lg:col-span-6">
            <SkillsConstellation
              accentColor={accentColor}
              onSelectSkill={(skill) => {
                setSelectedSkill(skill);
                soundFx.playClick();
              }}
            />
          </div>

          {/* Categorized Skills Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Tools I Master & Deploy</span>
              </h3>
              {selectedSkill && (
                <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  Highlighted: {selectedSkill}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((category) => (
                <div
                  key={category.name}
                  className="glass-panel p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all"
                >
                  <div className="text-xs font-mono font-semibold text-cyan-300 mb-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{category.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((s) => {
                      const isMatch = selectedSkill === s.name;
                      return (
                        <span
                          key={s.name}
                          onClick={() => {
                            setSelectedSkill(s.name);
                            soundFx.playClick();
                          }}
                          onMouseEnter={() => soundFx.playHover()}
                          className={`cursor-pointer px-2 py-1 rounded-md text-xs font-mono transition-all ${
                            isMatch
                              ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,240,255,0.7)]'
                              : s.featured
                              ? 'bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-200'
                              : 'bg-black/30 text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          {s.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Foundation Cards */}
        <div className="mt-12">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Academic Background</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <div
                key={i}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-display font-bold text-white">
                      {edu.institution}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {edu.badge}
                    </span>
                  </div>
                  <div className="text-sm font-sans text-cyan-200/90 font-medium mb-1">
                    {edu.degree}
                  </div>
                  <div className="text-xs font-mono text-gray-400 mb-3">
                    {edu.period}
                  </div>
                  <p className="text-xs text-gray-300">
                    Focus: {edu.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
