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
  private initialRandomJokes:Joke[] = [];

  constructor(private chuckApi: ChuckAPIService) {}

  ngOnInit(): void {
    this.loadInitialJokes();
  }

  private loadInitialJokes(): void {
    let requests:Array<Observable<Joke>> = [];

    for(let i = 0; i < HomePageComponent.INITIAL_RANDOM_JOKES; i++) {
      requests.push(this.chuckApi.getRandomJoke());
    }

    combineLatest(
      requests
    ).subscribe((results: Joke[])=>{
      this.initialRandomJokes = results;
    });
  }

}
