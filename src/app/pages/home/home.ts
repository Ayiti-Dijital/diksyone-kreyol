import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlfabeBar } from '../../shared/alfabe-bar/alfabe-bar';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { ENTRIES } from '../../shared/diksyone';
import { Icon, IconName } from '../../shared/icon/icon';
import { Kwiz } from '../../shared/kwiz/kwiz';
import { today } from '../../shared/kwiz-questions';
import { SearchPreview } from '../../shared/search-preview/search-preview';
import { SectionTitle } from '../../shared/section-title/section-title';
import { REPO_URL, mailto } from '../../shared/site';

/** A big colored tile under the alphabet; tiles without `path` are "Byento". */
interface Tile {
  readonly title: string;
  readonly text: string;
  readonly icon: IconName;
  /** Full Tailwind classes for the tile and its "Byento" ribbon. */
  readonly color: string;
  readonly ribbon: string;
  readonly path?: string;
}

const count = (key: 'sinonim' | 'kontre') =>
  ENTRIES.reduce((sum, entry) => sum + (entry.mo_ki_gen_rapo?.[key]?.length ?? 0), 0);

@Component({
  imports: [
    NgTemplateOutlet,
    RouterLink,
    AlfabeBar,
    Breadcrumb,
    Icon,
    Kwiz,
    SearchPreview,
    SectionTitle,
  ],
  selector: 'dk-home',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly crumbs: readonly Crumb[] = [
    { label: 'Akèy', link: '/' },
    { label: 'Lang Kreyòl' },
    { label: 'Diksyonè Kreyòl–Kreyòl' },
  ];
  protected readonly entries = ENTRIES;
  /** The quiz starts with the question of the day. */
  protected readonly day = today();

  protected readonly tiles: readonly Tile[] = [
    {
      title: 'Diksyonè Kreyòl',
      text: `${ENTRIES.length} mo, ak definisyon, egzanp ak pwononsyasyon an Kreyòl…`,
      icon: 'az',
      color: 'bg-navy-deep',
      ribbon: '',
      path: '/let/a',
    },
    {
      title: 'Sinonim ak kontrè',
      text: `${count('sinonim')} sinonim, ${count('kontre')} kontrè… sa ap grandi ak chak mo.`,
      icon: 'letters',
      color: 'bg-link',
      ribbon: 'bg-red text-white',
    },
    {
      title: 'Gramè Kreyòl',
      text: 'Detèminan, mak tan ak aspè, fraz: gramè Kreyòl la, esplike senp.',
      icon: 'book',
      color: 'bg-gold-deep',
      ribbon: 'bg-red text-white',
    },
    {
      title: 'Diksyonè pou lekòl',
      text: 'Diksyonè pou timoun 7–10 an ak 10–15 an.',
      icon: 'school',
      color: 'bg-red',
      ribbon: 'bg-gold text-navy-deep',
    },
  ];
  protected readonly helpHref = mailto('Diksyonè Kreyòl – mwen vle ede');
  protected readonly wordHref = mailto('Diksyonè Kreyòl – mo: konbit');
  protected readonly repoUrl = REPO_URL;
}
