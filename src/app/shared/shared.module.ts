import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

import { JokeCardComponent } from './joke-card/joke-card.component';
import { TopBarComponent } from './top-bar/top-bar.component';


const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];
@NgModule({
  declarations: [
    JokeCardComponent,
    TopBarComponent
  ],
  imports: [
    MATERIAL_MODULES,
    CommonModule
  ],
  exports: [
    MATERIAL_MODULES,
    JokeCardComponent,
    TopBarComponent
  ]
})
export class SharedModule { }
