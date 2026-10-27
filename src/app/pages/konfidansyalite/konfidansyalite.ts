import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { CONTACT_EMAIL, mailto } from '../../shared/site';

@Component({
  imports: [Breadcrumb],
  selector: 'dk-konfidansyalite',
  templateUrl: './konfidansyalite.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Konfidansyalite {
  protected readonly crumbs: readonly Crumb[] = [
    { label: 'Akèy', link: '/' },
    { label: 'Konfidansyalite' },
  ];
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly contactHref = mailto('Diksyonè Kreyòl – pwoteksyon done');

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Politik konfidansyalite Diksyonè Kreyòl la: pa gen cookie, pa gen swivi.',
    });
  }
}
