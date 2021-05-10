import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characters-list',
  template: `
    <app-search></app-search>
    <section class="character__list" infiniteScroll (scrolled)="onScrollDown()">
      <ng-container *ngIf="characters$ | async as characters; else showEmpty">
        <app-characters-card
          *ngFor="let character of characters"
          [character]="character"
        ></app-characters-card>
      </ng-container>
      <ng-template #showEmpty>
        <div class="not-results">
          <h1 class="not-results__title">Not results</h1>
          <img src="assets/imgs/404.jpeg" alt="404" />
        </div>
      </ng-template>
      <button *ngIf="showButton" class="button" (click)="onScrollTop()">
        ⬆️
      </button>
    </section>
  `,
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent {
  characters$ = this.dataSvc.characters$;
  showButton = false;

  private scrollHeight = 500;
  private pageNum = 1;

  constructor(
    private dataSvc: DataService,
    private localStorageSvc: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageXOffset; // Obtendremos los pixels que se ha desplazado el scroll.
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffset || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown(): void {
    this.pageNum++;
    this.dataSvc.getCharactersByPage(this.pageNum);
  }
}
