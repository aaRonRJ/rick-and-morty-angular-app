import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Character } from '@app/shared/interfaces/data.interface';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
})
export class CharactersCardComponent implements OnInit {
  @Input() character: Character;

  constructor() {}

  ngOnInit(): void {}
}
