import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { ChuckAPIService, Joke } from 'src/app/services/chuck-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private static INITIAL_RANDOM_JOKES: number = 10;
  public initialRandomJokes:Joke[] = [];
  public loading: boolean = true;

  constructor(private chuckApi: ChuckAPIService) {}

  ngOnInit(): void {
    this.loadInitialJokes();
  }

  private loadInitialJokes(): void {
    this.loading = true;

    let requests:Array<Observable<Joke>> = [];

    for(let i = 0; i < HomePageComponent.INITIAL_RANDOM_JOKES; i++) {
      requests.push(this.chuckApi.getRandomJoke());
    }

    combineLatest(requests).subscribe({
      next: (results:Joke[]) => {
        this.initialRandomJokes = results;
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: ()=> this.loading = false
    });

  }

}
