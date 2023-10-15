import { Injectable } from '@angular/core';
import { Joke } from './types/joke.type';

@Injectable({
  providedIn: 'root'
})
export class JokesStorageService {
  public static MAX_FAVORITES = 10;
  public static STORE_JOKE_KEY = 'favorites-db';
  public savedJokesList: Joke[] = [];

  private loadJokes(): void {
    const storedData = localStorage.getItem(JokesStorageService.STORE_JOKE_KEY);
    if (!storedData) {
      this.persistJokes();
    } else {
      this.savedJokesList = JSON.parse(storedData);
    }
  }

  private persistJokes(): void {
    localStorage.setItem(
      JokesStorageService.STORE_JOKE_KEY, JSON.stringify(this.savedJokesList)
    );
  }

  public getJokes(): Joke[] {
    this.loadJokes();
    return this.savedJokesList;
  }

  public addJoke(joke: Joke) {
    if (!this.isFull() && !this.isJokeInList(joke)) {
      this.savedJokesList.push(joke);
      this.persistJokes();
    }
  }

  public removeJoke(joke: Joke) {
    this.loadJokes();
    this.savedJokesList = this.savedJokesList.filter((element) => element.id !== joke.id);
    this.persistJokes();
  }

  public isJokeInList(joke: Joke): boolean {
    const currentJokesList = this.getJokes();
    const found = currentJokesList.find((element)=> (element.id === joke.id));
    return (found !== undefined);
  }

  public isFull(): boolean {
    return (this.savedJokesList.length >= JokesStorageService.MAX_FAVORITES);
  }
}
