import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home.component';
import { ListAppComponent } from './list-app/list-app.component';
const routes: Routes = [{ path: '', component: ListAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppHomeRoutingModule { }
