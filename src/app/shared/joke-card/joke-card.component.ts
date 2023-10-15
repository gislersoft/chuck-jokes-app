import { Component, Input } from '@angular/core';
import { Joke } from 'src/app/services/types/joke.type';

@Component({
  selector: 'app-joke-card',
  templateUrl: './joke-card.component.html',
  styleUrls: ['./joke-card.component.scss']
})
export class JokeCardComponent {
  @Input()
  public index: number = 0;

  @Input()
  public joke: Joke | undefined = undefined;

  public addToFavorites(joke: Joke | undefined): void {
    console.log(joke);
  }
}
