import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';
import { ListPubComponent } from './list-pub/list-pub.component';

const routes: Routes = [
  { path: '', component: ListAppComponent },
  { path: 'getpub', component: ListPubComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHomeRoutingModule { }
