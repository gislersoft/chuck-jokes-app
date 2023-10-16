import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCardComponent } from './joke-card.component';
import { SharedModule } from '../shared.module';
import { chuckJokesMock } from 'src/tests/local-storage-data.mock';
import { JokesStorageService } from 'src/app/services/jokes-storage.service';

describe('JokeCardComponent', () => {
  let component: JokeCardComponent;
  let fixture: ComponentFixture<JokeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ JokeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fire delete event when delete mode is turn on', () => {
    const deleteJokeSpy = spyOn(component.deletedJoke,'emit');
    component.joke = chuckJokesMock[0];
    component.deleteMode = true;
    component.performAction(chuckJokesMock[0]);
    expect(deleteJokeSpy).toHaveBeenCalled();
  });
  it('should fire add event when delete mode is turn off', () => {
    const addedJokeSpy = spyOn(component.addedJoke,'emit');
    component.joke = chuckJokesMock[0];
    component.deleteMode = false;
    component.performAction(chuckJokesMock[0]);
    expect(addedJokeSpy).toHaveBeenCalled();
  });
  it('should turn on the icon heart when the joke is already in the favorites', () => {
    localStorage.clear();
    localStorage.setItem(JokesStorageService.STORE_JOKE_KEY, JSON.stringify(chuckJokesMock));
    component.joke = chuckJokesMock[0];
    component.deleteMode = true;
    const color = component.getColor(chuckJokesMock[0]);
    expect(color).toBe('warn');
    localStorage.clear();
  });
});
