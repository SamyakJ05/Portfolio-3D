import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Mail, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon, XTwitterIcon, InstagramIcon } from '../icons/SocialIcons';
import { soundFx } from '../../utils/audio';

export const Contact: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    soundFx.playChime();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    soundFx.playWarp();
    setSubmitted(true);

    // Open native mailto with formatted message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`Hi Samyak,\n\n${formState.message}\n\nBest,\n${formState.name}\n${formState.email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-t from-black via-[#060a12] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Transmission</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Let's <span className="text-hologram">Connect</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto">
            Whether you have a technical question, want to discuss cloud architecture, or have an exciting product build:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          {/* Left Info & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Box */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="text-xs font-mono text-gray-400 mb-2">Direct Email</div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="font-mono text-xs sm:text-sm text-cyan-300 truncate">
                  {personal.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all shrink-0"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Social Channels */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="text-xs font-mono text-gray-400 mb-2">Digital Outposts</div>

              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all text-gray-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono">LinkedIn / in/samyakj05</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all text-gray-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono">GitHub / @SamyakJ05</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={personal.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all text-gray-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <XTwitterIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono">X (Twitter) / @_samyakk</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={personal.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all text-gray-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <InstagramIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono">Instagram / @_samyakk</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 rounded-3xl border border-white/10 space-y-5 bg-[#0b1220]/90 shadow-2xl"
            >
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Send Direct Message
              </h3>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Ada Lovelace"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-gray-600 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="ada@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-gray-600 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">
                  Message / Project Scope
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your architectural vision, project timeline, or questions..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-gray-600 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-display font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>{submitted ? 'Message Ready · Sending...' : 'Dispatch Message →'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
