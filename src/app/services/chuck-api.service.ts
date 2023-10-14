import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export type Joke = {
  categories?: string[];
  created_at?: string;
  icon_url?: string;
  id?: string;
  updated_at?: string;
  url?: string;
  value?: string;
}

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
