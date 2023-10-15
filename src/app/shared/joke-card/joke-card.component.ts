import { JokesStorageService } from './../../services/jokes-storage.service';
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

  @Input()
  public deleteMode: boolean = false;

  constructor(private jokeStorageService: JokesStorageService) {}

  public performAction(joke: Joke | undefined): void {
    if (joke) {
      if (this.deleteMode) {
        this.jokeStorageService.removeJoke(joke);
      } else {
        this.jokeStorageService.addJoke(joke);
      }
    }
  }
}
