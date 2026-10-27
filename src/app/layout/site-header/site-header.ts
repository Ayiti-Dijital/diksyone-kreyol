import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchPreview } from '../../shared/search-preview/search-preview';
import { MAIN_SITE_URL } from '../../shared/site';

@Component({
  imports: [RouterLink, RouterLinkActive, SearchPreview],
  selector: 'dk-site-header',
  templateUrl: './site-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeader {
  protected readonly mainSiteUrl = MAIN_SITE_URL;
}
