import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCardComponent } from './joke-card.component';
import { SharedModule } from '../shared.module';

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
});
