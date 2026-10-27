import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlfabeBar } from '../../shared/alfabe-bar/alfabe-bar';
import { Breadcrumb, Crumb } from '../../shared/breadcrumb/breadcrumb';
import { ENTRIES } from '../../shared/diksyone';
import { Icon } from '../../shared/icon/icon';
import { SearchPreview } from '../../shared/search-preview/search-preview';
import { SectionTitle } from '../../shared/section-title/section-title';
import { REPO_URL, mailto } from '../../shared/site';

@Component({
  imports: [RouterLink, AlfabeBar, Breadcrumb, Icon, SearchPreview, SectionTitle],
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
  protected readonly helpHref = mailto('Diksyonè Kreyòl – mwen vle ede');
  protected readonly wordHref = mailto('Diksyonè Kreyòl – mo: konbit');
  protected readonly repoUrl = REPO_URL;
}
