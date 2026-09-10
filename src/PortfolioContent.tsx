import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Minus, Plus, X, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA as data, type Project } from './data/portfolioData';

function External({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true" /></a>;
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span>{children}</div>;
}

export function ProjectDetails({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const node = dialog.current!;
    const focus = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    node.showModal();
    return () => { node.close(); document.body.style.overflow = overflow; focus?.focus(); };
  }, [project]);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    {project && <div className="project-dialog-content">
      <button className="icon-button dialog-close" aria-label="Close project details" onClick={onClose}><X size={20} /></button>
      <span className="eyebrow">{project.tag}</span>
      <h2 id="project-title">{project.title}</h2>
      <p>{project.longDescription}</p>
      <h3>Inside the build</h3>
      <ul>{project.features.map(f => <li key={f}>{f}</li>)}</ul>
      <div className="stack-list">{project.stack.map(s => <span key={s}>{s}</span>)}</div>
      <div className="project-links">{project.links.live && <External href={project.links.live}>Visit project</External>}{project.links.github && <External href={project.links.github}>Source code</External>}{project.links.article && <External href={project.links.article}>Read the architecture</External>}</div>
    </div>}
  </dialog>;
}

export function About() {
  const [category, setCategory] = useState(0);
  return <section id="about-details" className="section about-section">
    <SectionLabel number="02">The person behind the systems</SectionLabel>
    <div className="about-layout"><h2>Engineer.<br />Builder.<br /><span className="muted">Always curious.</span></h2><div className="about-copy"><p className="large-copy">I like the space where a difficult problem becomes something people can actually use.</p><p>{data.personal.shortBio}</p><External href={data.personal.socials.github} className="text-link">See what I’m building</External><div className="education-list">{data.education.map(e => <div key={e.institution}><span className="eyebrow">{e.period}</span><h3>{e.institution}</h3><p>{e.degree}</p></div>)}</div></div></div>
    <div className="toolbox"><div className="toolbox-heading"><h3>Tools of the trade</h3><span className="eyebrow">A working toolkit. Always evolving.</span></div><div className="toolbox-spatial"><div className="toolbox-controls"><div className="skill-tabs" aria-label="Skill categories">{data.skills.map((s, i) => <button key={s.name} aria-pressed={i === category} onClick={() => setCategory(i)}>{s.name}</button>)}</div><div className="skill-names" aria-live="polite">{data.skills[category].skills.map(s => <span key={s.name}>{s.name}<span className="accent">↗</span></span>)}</div></div></div></div>
  </section>;
}

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="experience-details" className="section experience-section"><SectionLabel number="03">Experience</SectionLabel><div className="section-heading"><h2>Built in the real world<span className="accent">.</span></h2><p>Production systems.<br />Real constraints. Lasting lessons.</p></div><div className="experience-spatial"><div className="experience-list">{data.experience.map((e, i) => <article key={`${e.company}-${i}`} className={open === i ? 'experience-item is-open' : 'experience-item'}><h3><button aria-expanded={open === i} aria-controls={`experience-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="experience-period">{e.period}</span><span className="experience-company">{e.company}</span><span className="experience-role">{e.role}</span>{open === i ? <Minus size={20} /> : <Plus size={20} />}</button></h3><div id={`experience-${i}`} className="experience-detail" hidden={open !== i}><p>{e.summary}</p><ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul><div className="stack-list">{e.technologies.map(t => <span key={t}>{t}</span>)}</div></div></article>)}</div></div></section>;
}

export function Recognition() {
  const [selectedAward, setSelectedAward] = useState(0);
  return <section id="awards-details" className="section recognition-section"><SectionLabel number="04">Recognition</SectionLabel><div className="recognition-layout"><div className="recognition-intro"><h2>A few<br /> milestones<span className="accent">.</span></h2></div><div className="awards-list">{data.awards.map((a, i) => <details key={a.id} onToggle={e => { if (e.currentTarget.open) setSelectedAward(i); }}><summary><span className="work-number">{String(i + 1).padStart(2, '0')}</span><span>{a.title}<small>{a.issuer}</small></span><Plus size={17} /></summary><div><p>{a.description}</p>{a.link && <External className="text-link" href={a.link}>Read the story</External>}</div></details>)}</div></div></section>;
}

export function Contact() {
  const [copied, setCopied] = useState('');
  const [drafted, setDrafted] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try { await navigator.clipboard.writeText(data.personal.email); setCopied('Email copied'); }
    catch { setCopied('Could not copy. Select the email address to copy it.'); }
    clearTimeout(timer.current); timer.current = setTimeout(() => setCopied(''), 4000);
  }
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);
    const body = `Hi Samyak,\n\n${fields.get('message')}\n\n${fields.get('name')}\n${fields.get('email')}`;
    window.location.href = `mailto:${data.personal.email}?subject=${encodeURIComponent(`Project inquiry from ${fields.get('name')}`)}&body=${encodeURIComponent(body)}`;
    setDrafted(true);
  }
  return <section id="contact-details" className="section contact-section"><SectionLabel number="06">What’s next?</SectionLabel><div className="contact-heading"><h2>Have something<br />in mind<span className="accent">?</span></h2><a className="contact-arrow" href={`mailto:${data.personal.email}`} aria-label="Email Samyak"><ArrowUpRight /></a></div><div className="contact-layout"><div><p className="large-copy">Let’s give it a first version.</p><p>I take on a small number of freelance projects alongside my work at UBS.</p><div className="email-line"><a href={`mailto:${data.personal.email}`}>{data.personal.email}</a><button className="icon-button" onClick={copy} aria-label="Copy email address">{copied === 'Email copied' ? <Check size={17} /> : <Copy size={17} />}</button></div><p className="form-note" role="status">{copied}</p><div className="social-links">{[['GitHub', data.personal.socials.github], ['LinkedIn', data.personal.socials.linkedin], ['X', data.personal.socials.twitter], ['Instagram', data.personal.socials.instagram]].map(([label, href]) => <External key={label} href={href}>{label}</External>)}</div></div><form onSubmit={submit} className="contact-form"><div className="form-pair"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Name" required /></label><label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div><label htmlFor="contact-message">What are you working on?<textarea id="contact-message" name="message" rows={3} placeholder="The idea, the challenge, or just a hello." required /></label><button className="primary-button" type="submit">Create email draft <ArrowUpRight size={18} /></button><p className="form-note" role="status">{drafted ? 'Your email app was requested. Review and send the draft there, or email me directly.' : 'Opens your email app with a draft ready to review.'}</p></form></div></section>;
}
