import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchPreview } from '../../shared/search-preview/search-preview';
import { ALFABE, REPO_URL, mailto } from '../../shared/site';

@Component({
  imports: [SearchPreview],
  selector: 'dk-home',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly alfabe = ALFABE;
  protected readonly helpHref = mailto('Diksyonè Kreyòl – mwen vle ede');
  protected readonly repoUrl = REPO_URL;
}
