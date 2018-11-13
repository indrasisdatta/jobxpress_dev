import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  @Input() isLoggedIn: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('Input isLoggedIn in Header C:', this.isLoggedIn);
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    // console.log('Logged in header flag:', this.isLoggedIn$);
  }

  onLogOut() {
    this.authService.userLogout();
  }

  testHeader() {
    console.log('Test header function');
  }

}
