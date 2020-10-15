import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  { path: '', component: AdminRootComponent, children: [
    {path: 'home', component: AdminHomeComponent },
    {path: 'users', component: AdminUsersComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
