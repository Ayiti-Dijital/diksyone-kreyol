import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { CONTACT_EMAIL, mailto } from '../../shared/site';

@Component({
  imports: [Breadcrumb],
  selector: 'dk-enfomasyon-legal',
  templateUrl: './enfomasyon-legal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnfomasyonLegal {
  protected readonly crumbs: readonly Crumb[] = [
    { label: 'Akèy', link: '/' },
    { label: 'Enfòmasyon legal' },
  ];
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly contactHref = mailto('Diksyonè Kreyòl');

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Enfòmasyon legal Diksyonè Kreyòl la (Impressum dapre § 5 DDG).',
    });
  }
}
