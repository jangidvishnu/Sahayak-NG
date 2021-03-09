import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SchemesComponent } from './schemes/schemes.component';
import { FamilyComponent } from './family/family.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditDataComponent } from './edit-data/edit-data.component';


@NgModule({
  declarations: [ProfileComponent, SchemesComponent, FamilyComponent, NotificationsComponent, EditDataComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
