import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { FavoritesPageComponent } from './favorites/favorites-page/favorites-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'favorites', component: FavoritesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
