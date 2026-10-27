import { inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { findEntry } from './shared/diksyone';

const wordTitle = (route: ActivatedRouteSnapshot) => {
  const entry = findEntry(route.paramMap.get('id') ?? '');
  return entry ? `${entry.mo} – Diksyonè Kreyòl` : 'Mo pa jwenn – Diksyonè Kreyòl';
};

/** Sets the page description of a word from its first meaning (also in the prerendered HTML). */
const wordDescription: ResolveFn<boolean> = (route) => {
  const entry = findEntry(route.paramMap.get('id') ?? '');
  inject(Meta).updateTag({
    name: 'description',
    content: entry
      ? `${entry.mo}: ${entry.sans[0].definisyon}`
      : 'Mo sa a poko nan Diksyonè Kreyòl la.',
  });
  return true;
};

export const routes: Routes = [
  {
    path: '',
    title: 'Diksyonè Kreyòl – chak mo Kreyòl, esplike an Kreyòl',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'mo/:id',
    title: wordTitle,
    resolve: { description: wordDescription },
    loadComponent: () => import('./pages/mo/mo').then((m) => m.Mo),
  },
  {
    path: 'let/:letter',
    title: (route) => `Lèt ${(route.paramMap.get('letter') ?? '').toUpperCase()} – Diksyonè Kreyòl`,
    loadComponent: () => import('./pages/let/let').then((m) => m.Let),
  },
  {
    path: 'jwet',
    title: 'Jwèt Kreyòl – Diksyonè Kreyòl',
    loadComponent: () => import('./pages/jwet/jwet').then((m) => m.Jwet),
  },
  {
    path: 'enfomasyon-legal',
    title: 'Enfòmasyon legal – Diksyonè Kreyòl',
    loadComponent: () =>
      import('./pages/enfomasyon-legal/enfomasyon-legal').then((m) => m.EnfomasyonLegal),
  },
  {
    path: 'konfidansyalite',
    title: 'Konfidansyalite – Diksyonè Kreyòl',
    loadComponent: () =>
      import('./pages/konfidansyalite/konfidansyalite').then((m) => m.Konfidansyalite),
  },
  { path: '**', redirectTo: '' },
];
