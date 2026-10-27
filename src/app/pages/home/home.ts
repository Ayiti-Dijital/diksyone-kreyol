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
  /** Full Tailwind classes for the colored top edge and the icon badge. */
  readonly accent: string;
  readonly badge: string;
  readonly path?: string;
}

const count = (key: 'sinonim' | 'kontre') =>
  ENTRIES.reduce((sum, entry) => sum + (entry.mo_ki_gen_rapo?.[key]?.length ?? 0), 0);

@Component({
  imports: [
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
      icon: 'book',
      accent: 'border-navy',
      badge: 'bg-navy/10 text-navy',
      path: '/let/a',
    },
    {
      title: 'Sinonim ak kontrè',
      text: `${count('sinonim')} sinonim, ${count('kontre')} kontrè… sa ap grandi ak chak mo.`,
      icon: 'letters',
      accent: 'border-red',
      badge: 'bg-red/10 text-red',
    },
    {
      title: 'Gramè Kreyòl',
      text: 'Detèminan, mak tan ak aspè, fraz: gramè Kreyòl la, esplike senp.',
      icon: 'license',
      accent: 'border-gold',
      badge: 'bg-gold/20 text-gold-deep',
    },
    {
      title: 'Diksyonè pou lekòl',
      text: 'Diksyonè pou timoun 7–10 an ak 10–15 an.',
      icon: 'school',
      accent: 'border-periwinkle',
      badge: 'bg-periwinkle/40 text-link',
    },
  ];
  protected readonly helpHref = mailto('Diksyonè Kreyòl – mwen vle ede');
  protected readonly wordHref = mailto('Diksyonè Kreyòl – mo: konbit');
  protected readonly repoUrl = REPO_URL;
}
