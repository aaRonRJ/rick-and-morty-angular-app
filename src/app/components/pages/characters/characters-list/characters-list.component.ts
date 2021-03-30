import { Component } from '@angular/core';

import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characters-list',
  template: `
    <section class="character__list">
      <app-characters-card
        *ngFor="let character of characters$ | async"
        [character]="character"
      ></app-characters-card>
    </section>
  `,
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  characters$ = this.dataSvc.characters$;

  constructor(
    private dataSvc: DataService,
    private localStorageSvc: LocalStorageService
  ) {}
}
