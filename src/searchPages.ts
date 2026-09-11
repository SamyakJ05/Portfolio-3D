import type { Plugin } from 'vite';
import { PORTFOLIO_DATA as data } from './data/portfolioData';

const origin = 'https://3d.samyak.space';
const escape = (value: string) => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const person = {
  '@type': 'Person', '@id': 'https://samyak.space/#person',
  name: data.personal.name, jobTitle: data.personal.title, url: 'https://samyak.space/',
  sameAs: [data.personal.socials.github, data.personal.socials.linkedin, data.personal.socials.twitter, data.personal.socials.instagram],
};
const schema = (url: string, name: string) => JSON.stringify({
  '@context': 'https://schema.org', '@graph': [person, {
    '@type': 'ProfilePage', '@id': `${url}#page`, url, name,
    mainEntity: { '@id': person['@id'] }, inLanguage: 'en',
  }],
}).replace(/</g, '\\u003c');

export function renderOverview() {
  const url = `${origin}/overview.html`;
  const title = 'Samyak Jain — Projects and Engineering Overview';
  const projects = data.projects.map(project => `<article><h3>${escape(project.title)}</h3><p>${escape(project.description)}</p><p>Technologies: ${project.stack.map(escape).join(', ')}</p><ul>${Object.entries(project.links).map(([label, href]) => `<li><a href="${escape(href)}">${escape(project.title)} — ${escape(label)}</a></li>`).join('')}</ul></article>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="A lightweight overview of Samyak Jain’s software projects, cloud engineering experience and public project links."><link rel="canonical" href="${url}"><script type="application/ld+json">${schema(url, title)}</script><style>body{margin:0;background:#0d0d0d;color:#eee;font:18px/1.7 system-ui,sans-serif}main,nav,footer{max-width:760px;margin:auto;padding:24px}a{color:#87d4df}h1,h2,h3{line-height:1.25}article{border-top:1px solid #444;padding:20px 0}nav a{margin-right:20px}h1{font-size:2.4rem}</style></head><body><nav aria-label="Portfolio links"><a href="/">Interactive 3D portfolio</a><a href="https://samyak.space/">Main portfolio</a><a href="https://blog.samyak.space/">Blog</a></nav><main><h1>${title}</h1><p>This lightweight page presents the projects behind the interactive 3D experience. It works without JavaScript or WebGL.</p><h2>About Samyak</h2><p>${escape(data.personal.shortBio)}</p><h2>Projects</h2>${projects}<h2>Education</h2><ul>${data.education.map(item => `<li>${escape(item.degree)} — ${escape(item.institution)}, ${escape(item.period)} (${escape(item.badge)})</li>`).join('')}</ul><h2>Find Samyak online</h2><ul>${['github', 'linkedin', 'twitter', 'instagram'].map(key => `<li><a href="${escape(data.personal.socials[key as keyof typeof data.personal.socials])}">${escape(key === 'twitter' ? 'X' : key)}</a></li>`).join('')}</ul></main><footer><a href="/">Explore the 3D portfolio</a></footer></body></html>`;
}

export function searchPages(): Plugin {
  return {
    name: 'portfolio-search-pages',
    transformIndexHtml() {
      return [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: schema(`${origin}/`, 'Samyak Jain — Interactive 3D Portfolio'), injectTo: 'head' }];
    },
    configureServer(server) {
      server.middlewares.use('/overview.html', (_req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(renderOverview());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'overview.html', source: renderOverview() });
    },
  };
}
