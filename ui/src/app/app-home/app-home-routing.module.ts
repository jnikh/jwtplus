import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';
import { ListPubComponent } from './list-pub/list-pub.component';
import { AuthTokenComponent } from './auth-token/auth-token.component';
import { VerifyAuthtokenComponent } from './verify-authtoken/verify-authtoken.component';
import { RenewAuthComponent } from './renew-auth/renew-auth.component';
import { RetriveActivesessioComponent } from './retrive-activesessio/retrive-activesessio.component';

const routes: Routes = [
  { path: '', component: ListAppComponent },
  { path: 'getpub', component: ListPubComponent },
  {path:'generateAuth' , component:AuthTokenComponent},
  {path:'verifyAuth',component:VerifyAuthtokenComponent},
  {path:'renewAuth',component:RenewAuthComponent},
  {path:'getActivesession',component:RetriveActivesessioComponent},
  {}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHomeRoutingModule { 
}
