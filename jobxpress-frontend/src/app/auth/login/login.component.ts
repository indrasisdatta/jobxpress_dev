import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,  Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public invalid_attempt: boolean = false;
  public btnDisabled: boolean = false;

  constructor(
    private fb: FormBuilder, 
    public authService: AuthService, 
    private router: Router
  ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email    : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  isInvalid(field): Boolean {
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

  submitLoginForm() {
    this.btnDisabled = true;
    this.authService.userLogin(this.loginForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.status == 0) {
              this.invalid_attempt = true;
              this.btnDisabled = false;
            } else if (resp.status == 1) {
              this.invalid_attempt = false;
              this.router.navigate(['/user/profile']);
            }
          },
          err => {
            throw err;
          }
        );

  }
}
