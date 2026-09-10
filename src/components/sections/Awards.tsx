import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { TrophyRoom } from '../3d/TrophyRoom';
import { Trophy, ExternalLink, Award, Sparkles, BookOpen, Star } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface AwardsProps {
  accentColor: string;
}

export const Awards: React.FC<AwardsProps> = ({ accentColor }) => {
  const { awards } = PORTFOLIO_DATA;
  const [hoveredAwardId, setHoveredAwardId] = useState<string | null>(null);

  return (
    <section id="awards" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#09101d]/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Awards & <span className="text-hologram">Accomplishments</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            Recognized by Amazon Web Services globally, Elsevier academic publications, national open-source foundations, and UBS engineering leadership.
          </p>
        </div>

        {/* Awards Cards Grid with 3D Trophies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => {
            const isHovered = hoveredAwardId === award.id;
            const trophyType =
              award.id === 'amazon-aideas'
                ? 'amazon'
                : award.id === 'ubs-gold'
                ? 'gold'
                : award.id === 'elsevier-research'
                ? 'research'
                : 'hackathon';

            return (
              <div
                key={award.id}
                onMouseEnter={() => {
                  setHoveredAwardId(award.id);
                  soundFx.playHover();
                }}
                onMouseLeave={() => setHoveredAwardId(null)}
                className={`glass-panel rounded-2xl p-6 glass-panel-hover flex flex-col justify-between relative overflow-hidden ${
                  award.featured
                    ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]'
                    : 'border-white/10'
                }`}
              >
                {/* 3D Visualizer Header for Featured Awards */}
                <div className="mb-4">
                  <TrophyRoom
                    type={trophyType}
                    accentColor={accentColor}
                    isHovered={isHovered}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cyan-400">
                      {award.issuer}
                    </span>
                    {award.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-300" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                    {award.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-4">
                    {award.description}
                  </p>
                </div>

                {award.link && (
                  <div className="pt-3 border-t border-white/10">
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
                    >
                      <span>Read on AWS Builder Center</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
