import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Diksyonè Kreyòl – chak mo Kreyòl, esplike an Kreyòl',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
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
