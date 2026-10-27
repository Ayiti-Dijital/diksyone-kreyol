import { RenderMode, ServerRoute } from '@angular/ssr';
import { ENTRIES } from './shared/diksyone';
import { ALFABE } from './shared/site';

// Every page is prerendered to static HTML at build time: no server, no backend.
export const serverRoutes: ServerRoute[] = [
  {
    path: 'mo/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ENTRIES.map((entry) => ({ id: entry.id })),
  },
  {
    path: 'let/:letter',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => ALFABE.map((letter) => ({ letter })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
