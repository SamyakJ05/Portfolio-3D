import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

const QUICK_COMMANDS = ['bio', 'skills', 'projects', 'awards', 'contact', 'hire', 'clear'];

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  isOpen,
  onClose,
  onThemeChange,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'welcome',
      output: (
        <div className="space-y-1">
          <p className="terminal-accent font-bold">
            Samyak / Terminal
          </p>
          <p className="text-xs terminal-muted">
            Type <span className="terminal-accent font-bold">help</span> for commands, or choose one below.
          </p>
        </div>
      ),
    },
  ]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    soundFx.playClick();
    const parts = rawCmd.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    if (mainCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let resultOutput: React.ReactNode = '';
    let isError = false;

    switch (mainCmd) {
      case 'help':
        resultOutput = (
          <div className="text-xs space-y-1">
            <p className="terminal-accent font-semibold">Commands:</p>
            <p><span className="terminal-accent">bio</span> — Engineer bio and credentials</p>
            <p><span className="terminal-accent">skills</span> — Full stack and cloud capabilities</p>
            <p><span className="terminal-accent">projects</span> — Flagship production projects</p>
            <p><span className="terminal-accent">awards</span> — Honors and Amazon AIdeaS 2026 win</p>
            <p><span className="terminal-accent">hire</span> — Freelance availability and domains</p>
            <p><span className="terminal-accent">contact</span> — Email and social links</p>

            <p><span className="terminal-accent">clear</span> — Clear terminal output</p>
          </div>
        );
        break;

      case 'bio':
        resultOutput = (
          <div className="text-xs space-y-1">
            <p className="text-white font-bold">{PORTFOLIO_DATA.personal.name} — {PORTFOLIO_DATA.personal.title} @ {PORTFOLIO_DATA.personal.company}</p>
            <p>{PORTFOLIO_DATA.personal.education}</p>
            <p className="terminal-accent italic">{PORTFOLIO_DATA.personal.tagline}</p>
            <p className="pt-1 terminal-muted">{PORTFOLIO_DATA.personal.shortBio}</p>
          </div>
        );
        break;

      case 'skills':
        resultOutput = (
          <div className="text-xs space-y-2">
            {PORTFOLIO_DATA.skills.map((c) => (
              <div key={c.name}>
                <span className="terminal-accent font-semibold">{c.name}: </span>
                <span>{c.skills.map((s) => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        resultOutput = (
          <div className="text-xs space-y-2">
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-b border-white/5 pb-1">
                <span className="text-white font-bold">{p.title}</span>{' '}
                <span className="terminal-accent">[{p.tag}]</span>
                <p className="terminal-muted">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'awards':
        resultOutput = (
          <div className="text-xs space-y-2">
            {PORTFOLIO_DATA.awards.map((a) => (
              <div key={a.id} >
                <span className="terminal-accent font-bold">★ {a.title}</span> — <span className="terminal-muted">{a.issuer}</span>
                <p className="terminal-muted">{a.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'hire':
        resultOutput = (
          <div className="text-xs space-y-1">
            <p className="terminal-accent font-bold">Open for select freelance projects and technical advisory.</p>
            <p>Domains: AI-Powered Products, Cloud Architecture, IaC, High-Throughput APIs, Workflow Automation.</p>
            <p>Direct contact: <span className="terminal-accent">{PORTFOLIO_DATA.personal.email}</span></p>
          </div>
        );
        break;

      case 'contact':
        resultOutput = (
          <div className="text-xs space-y-1">
            <p>Email: <span className="terminal-accent">{PORTFOLIO_DATA.personal.email}</span></p>
            <p>LinkedIn: <a href={PORTFOLIO_DATA.personal.socials.linkedin} target="_blank" rel="noreferrer" className="terminal-accent underline">samyakj05</a></p>
            <p>GitHub: <a href={PORTFOLIO_DATA.personal.socials.github} target="_blank" rel="noreferrer" className="terminal-accent underline">SamyakJ05</a></p>
            <p>X: <a href={PORTFOLIO_DATA.personal.socials.twitter} target="_blank" rel="noreferrer" className="terminal-accent underline">@_samyakk</a></p>
          </div>
        );
        break;

      default:
        resultOutput = <span className="terminal-error">Command not found: '{rawCmd}'. Type 'help' for commands.</span>;
        isError = true;
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output: resultOutput,
        isError,
      },
    ]);
    setInput('');
  };

  return (
    <dialog
      ref={dialogRef}
      className="terminal-dialog"
      aria-labelledby="terminal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className="terminal-shell">
        <header className="terminal-header">
          <div>
            <TerminalIcon size={16} aria-hidden="true" />
            <h2 id="terminal-title">Samyak / Terminal</h2>
          </div>
          <button
            type="button"
            aria-label="Close terminal"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <nav className="terminal-commands" aria-label="Quick commands">
          {QUICK_COMMANDS.map((cmd) => (
            <button key={cmd} type="button" onClick={() => executeCommand(cmd)}>
              {cmd}
            </button>
          ))}
        </nav>

        <div
          ref={scrollRef}
          className="terminal-log"
          role="log"
          aria-label="Command output"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
        >
          {history.map((log) => (
            <div key={log.id} className="terminal-entry" data-error={log.isError || undefined}>
              <p className="terminal-prompt"><span aria-hidden="true">› </span>{log.command}</p>
              <div>{log.output}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            executeCommand(input);
          }}
          className="terminal-input"
        >
          <span aria-hidden="true">›</span>
          <input
            ref={inputRef}
            type="text"
            aria-label="Terminal command"
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type a command…"
          />
          <button type="submit" aria-label="Run command">
            <CornerDownLeft size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
    </dialog>
  );
};
