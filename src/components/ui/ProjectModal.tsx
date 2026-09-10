import React from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';
import { Project } from '../../data/portfolioData';
import { ProjectHologram } from '../3d/ProjectHologram';
import { soundFx } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  accentColor: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  accentColor,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-panel w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative max-h-[90vh] flex flex-col bg-[#0b1220]/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
              {project.tag}
            </span>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* 3D Visualizer Header */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <ProjectHologram
              type={project.hologramType}
              accentColor={accentColor}
              isHovered={true}
            />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans mb-4">
              {project.longDescription}
            </p>
          </div>

          {/* Key Architectural Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Architectural Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-gray-300 bg-white/5 p-2.5 rounded-lg border border-white/5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Technologies Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links & Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playWarp()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-display font-bold text-xs hover:opacity-90 transition-all"
              >
                <span>Launch Live Product</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/15 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
                <span>Source Code</span>
              </a>
            )}

            {project.links.article && (
              <a
                href={project.links.article}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff9900]/10 hover:bg-[#ff9900]/20 text-[#ffb84d] font-mono text-xs border border-[#ff9900]/30 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[#ff9900]" />
                <span>AWS Builder Center Article</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
