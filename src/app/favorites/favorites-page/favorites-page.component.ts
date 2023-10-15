import { Component } from '@angular/core';
import { Joke } from 'src/app/services/types/joke.type';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent {
  public MAX_JOKES_PER_PAGE = 10;
  public jokesList:Joke[] = [];
}
