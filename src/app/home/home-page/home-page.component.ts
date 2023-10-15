import { JokesStorageService } from './../../services/jokes-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { ChuckAPIService } from 'src/app/services/chuck-api.service';
import { Joke } from 'src/app/services/types/joke.type';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private static TIMER_TIME = 5000;
  private timerSubscription: Subscription = Subscription.EMPTY;

  public MAX_JOKES_PER_PAGE = 10;
  public jokesList:Joke[] = [];

  constructor(
    private chuckApi: ChuckAPIService,
    private router: Router,
    private jokesStorageService: JokesStorageService
  ) {}

  ngOnInit(): void {
    this.loadInitialJokes();
  }

  private loadInitialJokes(): void {
    for(let i = 0; i < this.MAX_JOKES_PER_PAGE; i++) {
      this.pushNewJoke();
    }
  }

  private toggleTimer(): void {
    if (this.timerSubscription === Subscription.EMPTY) {
      this.timerSubscription = interval(HomePageComponent.TIMER_TIME).subscribe(() => {
        this.pushNewJoke();
      });
    }
  }

  private pushNewJoke(): void {
    this.chuckApi.getRandomJoke().subscribe({
      next: (results:Joke) => {
        if (this.isAnExistingJoke(results) ||
          this.jokesStorageService.isJokeInList(results)
        ) {
          return; // Ignore same jokes.
        }
        if (this.jokesList.length >= this.MAX_JOKES_PER_PAGE) {
          this.jokesList.shift();
        }
        results.timestamp = Date.now(); // Grab time maybe for unit tests later.
        this.jokesList.push(results);
        if (this.jokesList.length >= this.MAX_JOKES_PER_PAGE) {
          this.toggleTimer();
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  public isAnExistingJoke(joke: Joke): boolean {
    const found = this.jokesList.find((element)=> element.id === joke.id );
    return (found !== undefined);
  }

  public goToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  public addJokeToFavorites(event: Joke): void {
    this.jokesStorageService.addJoke(event);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
