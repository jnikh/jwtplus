import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';


@NgModule({
  declarations: [
    AppHomeComponent,
    ListAppComponent
  ],
  imports: [
    CommonModule,
    AppHomeRoutingModule
  ]
})
export class AppHomeModule {

  constructor(){}
 }
