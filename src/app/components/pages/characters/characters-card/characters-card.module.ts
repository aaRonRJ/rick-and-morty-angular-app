import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersCardComponent } from './characters-card.component';

@NgModule({
  declarations: [CharactersCardComponent],
  imports: [CommonModule],
  exports: [CharactersCardComponent],
})
export class CharactersCardModule {}
