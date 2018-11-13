import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/users';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  private token: String;
  private loggedIn = new BehaviorSubject<boolean>(this.userSessionExists());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private _getToken(): String {
    if (!this.token) {
      this.token = localStorage.getItem('user-token');
    }
    return this.token;
  }

  private _getUserDetails() : any {
    const token = this._getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public userSessionExists() : any {

    let data = [];
    const user = this._getUserDetails();
    if (!user) {
      return false;
    } else if (user.exp > (Date.now() / 1000)) {
      return true;     
    };
  }

  // private tokenAvailable(): boolean {
  //   return !!localStorage.getItem('user-token');
  // }

  constructor(private http: HttpClient, private router: Router) { }

  public userLogin(userData: User) {
    return this.http.post(AppSettings.API_ENDPOINT+'login', userData)
                    .pipe(
                      tap(
                        (resp: any) => {
                          // console.log(resp);
                          if (resp.status == 1) {
                            localStorage.setItem('user-token', resp.data.token);
                            this.loggedIn.next(true);
                          }
                        }
                      )
                    );
  }

  public userLogout() {
    localStorage.removeItem('user-token');
    this.loggedIn.next(false);
    this.router.navigate(['/auth/login']);
  }
}
