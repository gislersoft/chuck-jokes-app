import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { SharedModule } from '../shared.module';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ TopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home', fakeAsync(() => {
    component.goToHome();
    tick();
    expect(window.location.pathname).toBe('/');
  }));
});
