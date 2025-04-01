import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppHomeRoutingModule } from './app-home-routing.module';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';
import { ListPubComponent } from './list-pub/list-pub.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { VerifyAuthtokenComponent } from './verify-authtoken/verify-authtoken.component';
import { RenewAuthComponent } from './renew-auth/renew-auth.component';
import { RetriveActivesessioComponent } from './retrive-activesessio/retrive-activesessio.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppHomeComponent,
    ListAppComponent,
    ListPubComponent,
    AuthTokenComponent,
    VerifyAuthtokenComponent,
    RenewAuthComponent,
    RetriveActivesessioComponent,
    LogoutComponent
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
