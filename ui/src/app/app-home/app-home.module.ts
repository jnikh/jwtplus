import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';
import { ListPubComponent } from './list-pub/list-pub.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { VerifyAuthtokenComponent } from './verify-authtoken/verify-authtoken.component';


@NgModule({
  declarations: [
    AppHomeComponent,
    ListAppComponent,
    ListPubComponent,
    AuthTokenComponent,
    VerifyAuthtokenComponent
  ],
  imports: [
    CommonModule,
    AppHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppHomeModule {

  constructor(){}
 }
