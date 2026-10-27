import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CONTACT_EMAIL, mailto } from '../../shared/site';

@Component({
  selector: 'dk-enfomasyon-legal',
  templateUrl: './enfomasyon-legal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnfomasyonLegal {
  protected readonly contactEmail = CONTACT_EMAIL;
  protected readonly contactHref = mailto('Diksyonè Kreyòl');

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Enfòmasyon legal Diksyonè Kreyòl la (Impressum dapre § 5 DDG).',
    });
  }
}
