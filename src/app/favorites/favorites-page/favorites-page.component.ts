import { JokesStorageService } from './../../services/jokes-storage.service';
import { Component, OnInit } from '@angular/core';
import { Joke } from 'src/app/services/types/joke.type';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  public MAX_JOKES_PER_PAGE = 10;
  public jokesList:Joke[] = [];

  constructor(private jokesStorageService: JokesStorageService) {}

  ngOnInit(): void {
    this.jokesList = this.jokesStorageService.getJokes();
  }

  public deleteJoke(event: Joke) {
    this.jokesStorageService.removeJoke(event);
    this.jokesList = this.jokesStorageService.getJokes();
  }
}
