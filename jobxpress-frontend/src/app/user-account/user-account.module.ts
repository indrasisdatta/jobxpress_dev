import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { AuthService } from '../auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    UserAccountRoutingModule
  ],
  providers: [AuthService],
  declarations: [ProfileComponent]
})
export class UserAccountModule { 

  constructor() {
    console.log('User account module loaded!');
  }
}
