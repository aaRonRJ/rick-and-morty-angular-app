/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>(null);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(private toastrSvc: ToastrService) {
    // Llamamos al método de inicializar el storage cuando se inicialice la clase.
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = currentsFav.find((fav: Character) => fav.id === id);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const newsFav = currentsFav.filter((fav: Character) => fav.id !== id);

      localStorage.setItem(MY_FAVORITES, JSON.stringify([...newsFav]));
      this.charactersFavSubject.next([...newsFav]);
      this.toastrSvc.warning(`Removed to favorite`, 'Rick&MortyAPP');
    } catch (error) {
      console.log('Error removing localStorage', error);
      this.toastrSvc.error(
        `Error removing localStorage ${error}`,
        'Rick&MortyAPP'
      );
    }
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(
        MY_FAVORITES,
        JSON.stringify([...currentsFav, character])
      );
      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrSvc.success(
        `${character.name} added to favorite`,
        'Rick&MortyAPP'
      );
    } catch (error) {
      console.log('Error saving localStorage', error);
      this.toastrSvc.error(
        `Error saving localStorage ${error}`,
        'Rick&MortyAPP'
      );
    }
  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.charactersFavSubject.next(charactersFav);

      return charactersFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));

    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }

    this.getFavoritesCharacters();
  }
}
