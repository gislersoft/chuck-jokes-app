import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input() public currentPage = '';

  constructor(private router: Router) {}

  public goToHome(): void {
    this.router.navigate(['/']);
  }
}
