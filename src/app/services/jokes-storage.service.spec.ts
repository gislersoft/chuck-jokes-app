import { TestBed } from '@angular/core/testing';
import { JokesStorageService } from './jokes-storage.service';
import { chuckJokesMock } from '../../tests/local-storage-data.mock';
import { Joke } from './types/joke.type';

const jokeMock: Joke = {
  categories: [],
  created_at: '2020-01-05 13:42:25.099703',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: 'fhajskdfhaksfha7788',
  updated_at: '2020-01-05 13:42:25.099703',
  url: 'https://api.chucknorris.io/jokes/fhajskdfhaksfha7788',
  value:
    'Chuck Norris develop without unit test.'
};

describe('JokesStorageService', () => {
  let service: JokesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when there are jokes in the localstorage', () => {
    beforeEach(() =>{
      localStorage.clear();
      localStorage.setItem(JokesStorageService.STORE_JOKE_KEY, JSON.stringify(chuckJokesMock));
    });
    it('should load jokes from the localstorage', () => {
      const currentJokes = service.getJokes();
      expect(currentJokes).toEqual(chuckJokesMock);
    });
    it('should add a joke to the list', () => {
      service.addJoke(jokeMock);
      const currentJokes = service.getJokes();
      const jokesCompare = [...chuckJokesMock];
      jokesCompare.push(jokeMock);
      expect(currentJokes).toEqual(jokesCompare);
    });
    it('should remove a joke from the list', () => {
      service.addJoke(jokeMock);
      service.removeJoke(jokeMock);
      const currentJokes = service.getJokes();
      expect(currentJokes).toEqual(chuckJokesMock);
    });
    afterAll(()=>{
      localStorage.clear();
    });
  });

  describe('when multiple jobs are added or removed', () => {
    beforeAll(() =>{
      localStorage.clear();
      localStorage.setItem(JokesStorageService.STORE_JOKE_KEY, JSON.stringify(chuckJokesMock));
    });
    it('should not add the same joke', () => {
      service.addJoke(jokeMock);
      service.addJoke(jokeMock);
      service.addJoke(jokeMock);
      const currentJokes = service.getJokes();
      const jokesCompare = [...chuckJokesMock];
      jokesCompare.push(jokeMock);
      expect(currentJokes).toEqual(jokesCompare);
    });
    it('should remove the joke', () => {
      service.addJoke(jokeMock);
      service.removeJoke(jokeMock);
      service.removeJoke(jokeMock);
      service.removeJoke(jokeMock);
      const currentJokes = service.getJokes();
      expect(currentJokes).toEqual(chuckJokesMock);
    });
    afterAll(()=>{
      localStorage.clear();
    });
  });

  describe('when localstorage is empty', () => {
    beforeEach(() =>{
      localStorage.clear();
    });
    it('should load an empty array of jokes', () => {
      const currentJokes = service.getJokes();
      expect(currentJokes).toEqual([]);
    });
  });

});
