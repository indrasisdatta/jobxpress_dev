import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, FormBuilder,  Validators, AbstractControl } from '@angular/forms';

import { ngfModule, ngf } from "angular-file";
import { NgModule } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  /* Declare all necessary class variables */
  public colorTheme: any = 'theme-blue'; 
  public bsConfig: Partial<BsDatepickerConfig>;
  public startMinDate: Date;
  public endMinDate: Date;
  public angForm: FormGroup;
  public disableBtn: Boolean;

  postUrl = 'http://localhost:7777/jobxpress/jobexpress-backend/api/get-services';
  myFormData:FormData;
  httpEvent:HttpEvent<Event>;

  constructor(public HttpClient:HttpClient, private fb: FormBuilder) { 
    this.startMinDate = new Date();
    this.endMinDate   = new Date();
    this.createForm();
  }

  uploadFiles(files:File[]) {
    console.log('Files --> ', files);
  }

  ngOnInit() {
    /* Set datepicker background color */
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  /* Form group of add post form */
  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
      budget: [''],
      maxSize: ['1024']
    });
  }

  /* Return whether a specific form field is valid (true/false) */
  public isInvalid(field) : Boolean {
    return  this.angForm.controls[field].invalid && (this.angForm.controls[field].dirty || this.angForm.controls[field].touched);
  }

  public dragFiles() {
    console.log('Drag file function called!');
  }

  /* Log input object data for debugging purpose */
  public log(obj) {
    console.log(this.angForm.controls);
  }

  /* Add post function after submit */
  public submitPost() {
    console.log(this.angForm);
  }
}
