import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPageComponent } from './favorites-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JokesStorageService } from 'src/app/services/jokes-storage.service';
import { chuckJokesMock } from 'src/tests/local-storage-data.mock';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ FavoritesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
    localStorage.setItem(JokesStorageService.STORE_JOKE_KEY, JSON.stringify(chuckJokesMock));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the favorites jokes', () => {
    expect(component.jokesList.length).toBe(10);
  });

  it('should delete a favorite joke', () => {
    component.deleteJoke(chuckJokesMock[0]);
    expect(component.jokesList.length).toBe(9);
  });
});
