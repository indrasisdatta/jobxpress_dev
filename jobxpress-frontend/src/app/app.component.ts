import { Observable } from 'rxjs/Observable';
import { Component, AfterViewInit, Output } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'Job Xpress';
  loading: boolean;

  // isLoggedIn$: Observable<boolean>;

  @Output() isLoggedIn: any = new EventEmitter();  
  
  constructor(private router: Router, private authService: AuthService) {
    this.loading = true;
  }

  ngOnInit() {
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn.emit(this.authService.isLoggedIn);
  }

  ngAfterViewInit() {
    this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.loading = true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
            this.loading = false;
          }
        })
  }

  logoutAction() {
    this.authService.userLogout();
  }
}
