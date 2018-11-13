import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

import { AuthRoutingModule } from './auth-routing.module';
// import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, AuthComponent],
  // providers: [AuthService]
})
export class AuthModule { }

