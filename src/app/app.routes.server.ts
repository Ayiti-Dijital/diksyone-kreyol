import { RenderMode, ServerRoute } from '@angular/ssr';

// Every page is prerendered to static HTML at build time: no server, no backend.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
