import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CONTACT_EMAIL, mailto } from '../../shared/site';

@Component({
  selector: 'dk-konfidansyalite',
  templateUrl: './konfidansyalite.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Konfidansyalite {
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly contactHref = mailto('Diksyonè Kreyòl – pwoteksyon done');

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Politik konfidansyalite Diksyonè Kreyòl la: pa gen cookie, pa gen swivi.',
    });
  }
}
