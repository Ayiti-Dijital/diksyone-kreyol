import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlfabeBar } from '../../shared/alfabe-bar/alfabe-bar';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { ENTRIES, displayPhones, findEntry } from '../../shared/diksyone';
import { Icon } from '../../shared/icon/icon';
import { Kwiz } from '../../shared/kwiz/kwiz';
import { today } from '../../shared/kwiz-questions';
import { SearchPreview } from '../../shared/search-preview/search-preview';
import { SectionTitle } from '../../shared/section-title/section-title';
import { REPO_URL, mailto } from '../../shared/site';

const count = (key: 'sinonim' | 'kontre') =>
  ENTRIES.reduce((sum, entry) => sum + (entry.mo_ki_gen_rapo?.[key]?.length ?? 0), 0);

@Component({
  imports: [RouterLink, AlfabeBar, Breadcrumb, Icon, Kwiz, SearchPreview, SectionTitle],
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

  /** The sample word on the dictionary card: the word of the day, with its syllables and sounds. */
  private readonly sampleEntry = findEntry('konbit')!;
  protected readonly sample = {
    syllables: this.sampleEntry.silab,
    phones: displayPhones(this.sampleEntry.pwononsyasyon),
    category: this.sampleEntry.sans[0].kategori,
  };
  protected readonly synonyms = count('sinonim');
  protected readonly antonyms = count('kontre');
  protected readonly helpHref = mailto('Diksyonè Kreyòl – mwen vle ede');
  protected readonly wordHref = mailto('Diksyonè Kreyòl – mo: konbit');
  protected readonly repoUrl = REPO_URL;
}
