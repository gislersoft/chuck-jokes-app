import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { ChuckAPIService, Joke } from 'src/app/services/chuck-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private static TIMER_TIME = 5000;
  private timerSubscription: Subscription = Subscription.EMPTY;

  public MAX_JOKES_PER_PAGE = 10;
  public initialRandomJokes:Joke[] = [];

  constructor(private chuckApi: ChuckAPIService) {}

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
        if (this.initialRandomJokes.length >= this.MAX_JOKES_PER_PAGE) {
          this.initialRandomJokes.shift();
        }
        results.timestamp = Date.now(); // Grab time maybe for unit tests later.
        this.initialRandomJokes.push(results);
        if (this.initialRandomJokes.length >= this.MAX_JOKES_PER_PAGE) {
          this.toggleTimer();
        }
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
