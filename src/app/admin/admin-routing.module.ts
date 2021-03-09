import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { SingleRequestComponent } from './single-request/single-request.component';

const routes: Routes = [
  {
    path: 'admin', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/admin/(admin:requests)'},
      { path: 'requests', component: RequestsComponent , outlet:'admin' },
      { path: 'requests/singleRequest/:id', component: SingleRequestComponent , outlet:'admin' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
