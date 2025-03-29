import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootHomeRoutingModule } from './root-home-routing.module';
import { RootHomeComponent } from './root-home.component';
import { ListAllComponent } from './list-all/list-all.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    RootHomeComponent,
    ListAllComponent,
    CreateComponent,
    UpdateComponent

  ],
  imports: [
    CommonModule,
    RootHomeRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule

  ]
})
export class RootHomeModule { }
