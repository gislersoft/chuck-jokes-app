import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChuckAPIService } from 'src/app/services/chuck-api.service';
import { of } from 'rxjs';
import { chuckJokesMock } from 'src/tests/local-storage-data.mock';
import { Joke } from 'src/app/services/types/joke.type';


const chuckAPIServiceMock = {
  getRandomJoke: () => {
    return of(chuckJokesMock[9]);
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let maximumJokes: Joke[] = [...chuckJokesMock];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [ HomePageComponent ],
      providers: [{
        provide: ChuckAPIService,
        useValue: chuckAPIServiceMock
     }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    component.jokesList = maximumJokes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should push a new random joke', fakeAsync(() => {
    // Remove two
    component.jokesList.shift();
    component.jokesList.shift();
    component.pushJoke(chuckJokesMock[0]);
    fixture.whenStable().then(() => {
      expect(component.jokesList.length).toBe(9);
    });
  }));

  it('should toggle timer when reach maximum', async () => {
    const toggleTimerSpy = spyOn(component,'toggleTimer');
    component.pushJoke({
      categories: [],
      created_at: '2020-01-05 13:42:25.099703',
      icon_url: '',
      id: 'dsfadsgh85234523',
      updated_at: '2020-01-05 13:42:25.099703',
      url: '',
      value: 'Chuck Norris New Joke'
    });
    component.pushJoke({
      categories: [],
      created_at: '2020-01-05 13:42:25.099703',
      icon_url: '',
      id: '53423agagsags243',
      updated_at: '2020-01-05 13:42:25.099703',
      url: '',
      value: 'Chuck Norris New Joke 2'
    });
    expect(toggleTimerSpy).toHaveBeenCalled();
  });

  it('should toggle timer create the interval subscription', async () => {
    component.toggleTimer();
    expect(component.timerSubscription).not.toBeUndefined();
  });

});
