import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HeaderComponent } from '../../header/header.component';
import { PostListComponent } from '../../posts/post-list/post-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log('Header C ', this.headerComponent);
  }

  onLogOut() {
    // this.headerComponent.userLogout();
    console.log(this.headerComponent);
  }

}
