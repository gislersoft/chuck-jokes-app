import { Component, OnInit } from '@angular/core';
import { ChuckAPIService } from 'src/app/services/chuck-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private chuckApi: ChuckAPIService) {}

  ngOnInit(): void {
    this.chuckApi.getRandomJoke().subscribe((results)=>{
      console.log(results);
    });
  }
}
