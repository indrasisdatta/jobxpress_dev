import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    data: {req:'login'}
  },
  {
    path: 'register',
    component: AuthComponent,
    data: {req:'register'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
