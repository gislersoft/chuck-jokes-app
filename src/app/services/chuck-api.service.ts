import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Joke } from './types/joke.type';

@Injectable({
  providedIn: 'root'
})
export class ChuckAPIService {
  private apiBase = 'https://api.chucknorris.io/jokes';

  constructor(private http: HttpClient) { }

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(`${this.apiBase}/random`)
  }

}
