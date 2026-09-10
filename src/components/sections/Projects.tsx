import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { ProjectHologram } from '../3d/ProjectHologram';
import { ProjectModal } from '../ui/ProjectModal';
import { soundFx } from '../../utils/audio';
import { ExternalLink, Trophy, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';

interface ProjectsProps {
  accentColor: string;
}

export const Projects: React.FC<ProjectsProps> = ({ accentColor }) => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const heroProject = projects.find((p) => p.featured && p.id === 'retainiq') || projects[0];
  const gridProjects = projects.filter((p) => p.id !== heroProject.id);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Engineering Showcase</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Things I've <span className="text-hologram">Architected & Shipped</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto">
            Interactive WebGL 3D models of production cloud platforms, AI agent studios, and real-time telemetry systems. Hover over any hologram to interact or click to inspect the architecture.
          </p>
        </div>

        {/* ── Flagship Project: RetainIQ (Amazon AIdeaS 2026 Winner) ── */}
        <div
          onMouseEnter={() => {
            setHoveredCardId(heroProject.id);
            soundFx.playHover();
          }}
          onMouseLeave={() => setHoveredCardId(null)}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/30 bg-gradient-to-br from-[#0e1628]/90 via-[#070c16]/90 to-[#040810]/95 shadow-[0_0_40px_rgba(255,153,0,0.15)] mb-12 relative overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Project Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ff9900]/15 text-[#ffb84d] text-xs font-mono font-bold border border-[#ff9900]/40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,153,0,0.25)]">
                  <Trophy className="w-3.5 h-3.5" />
                  Amazon AIdeaS 2026 Global Winner · Innovation Category
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 text-xs font-mono">
                  Serverless AWS
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-amber-300 transition-colors">
                {heroProject.title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed font-sans">
                {heroProject.description}
              </p>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {heroProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                {heroProject.links.live && (
                  <a
                    href={heroProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playWarp()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff9900] text-black font-display font-bold text-xs hover:bg-[#ffad33] transition-all shadow-lg"
                  >
                    <span>Visit Live Site</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {heroProject.links.article && (
                  <a
                    href={heroProject.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#ffb84d] font-mono text-xs border border-white/15 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>AWS Builder Article</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    setSelectedProject(heroProject);
                    soundFx.playClick();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Architecture Specs</span>
                </button>
              </div>
            </div>

            {/* 3D Hologram Viewer */}
            <div className="lg:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 relative">
              <ProjectHologram
                type={heroProject.hologramType}
                accentColor="#ff9900"
                isHovered={hoveredCardId === heroProject.id}
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                Live 3D Knowledge Network
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary Projects 3D Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => {
                setHoveredCardId(project.id);
                soundFx.playHover();
              }}
              onMouseLeave={() => setHoveredCardId(null)}
              className="glass-panel rounded-2xl overflow-hidden glass-panel-hover flex flex-col justify-between group"
            >
              <div>
                {/* 3D Model Canvas */}
                <div className="cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <ProjectHologram
                    type={project.hologramType}
                    accentColor={accentColor}
                    isHovered={hoveredCardId === project.id}
                  />
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-mono text-cyan-400 mb-1.5 uppercase tracking-wider">
                    {project.tag}
                  </div>

                  <h4 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-gray-400 text-xs sm:text-sm font-sans line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-black/20">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    soundFx.playClick();
                  }}
                  className="text-xs font-mono text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <span>Inspect 3D</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playWarp()}
                      className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all"
                      title="Live Product"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={accentColor}
      />
    </section>
  );
};
