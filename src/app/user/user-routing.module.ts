import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { FamilyComponent } from './family/family.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SchemesComponent } from './schemes/schemes.component';

const routes: Routes = [
  {
    path: 'user', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/user/(user:profile)'},
      { path: 'profile', component: ProfileComponent , outlet:'user' },
      { path: 'schemes', component: SchemesComponent , outlet:'user' },
      { path: 'family', component:FamilyComponent , outlet:'user' },
      { path: 'notifications', component: NotificationsComponent , outlet:'user' },
      { path: 'editData', component: EditDataComponent , outlet:'user' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
