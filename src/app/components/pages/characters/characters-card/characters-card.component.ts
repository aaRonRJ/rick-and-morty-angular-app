import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Component } from '@angular/core';

import { Character } from '@app/shared/interfaces/data.interface';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCardComponent {
  @Input() character: Character;

  constructor() {}

  toggleFavorite(): void {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
  }

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }
}
