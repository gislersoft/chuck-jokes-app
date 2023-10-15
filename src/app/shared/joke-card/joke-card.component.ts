import { JokesStorageService } from './../../services/jokes-storage.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() deletedJoke = new EventEmitter<Joke>();
  @Output() addedJoke = new EventEmitter<Joke>();

  constructor(private jokeStorageService: JokesStorageService) {}

  public performAction(joke: Joke | undefined): void {
    if (joke) {
      if (this.deleteMode) {
        this.deletedJoke.emit(joke);
      } else {
        this.addedJoke.emit(joke);
      }
    }
  }

  public getColor(joke: Joke | undefined): string {
    if (joke && this.jokeStorageService.isJokeInList(joke)) {
        return 'warn';
    }
    return '';
  }
}
