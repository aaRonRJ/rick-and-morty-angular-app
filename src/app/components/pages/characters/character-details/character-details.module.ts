import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterDetailsRoutingModule } from './character-details-routing.module';
import { CharacterDetailsComponent } from './character-details.component';
import { CharactersCardModule } from '../characters-card/characters-card.module';

@NgModule({
  declarations: [CharacterDetailsComponent],
  imports: [CommonModule, CharacterDetailsRoutingModule, CharactersCardModule],
})
export class CharacterDetailsModule {}
