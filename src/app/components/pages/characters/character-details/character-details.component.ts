import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Character } from '@app/shared/interfaces/data.interface';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-character-details',
  template: `<section class="character__details">
    <app-characters-card
      *ngIf="character$ | async as character"
      [character]="character"
    ></app-characters-card>
  </section>`,
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  character$: Observable<Character>;

  constructor(private route: ActivatedRoute, private dataSvc: DataService) {
    this.route.params
      .pipe(
        take(1),
        tap(({ id }) => (this.character$ = this.dataSvc.getCharacter(id)))
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
