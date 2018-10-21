import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, FormBuilder,  Validators, AbstractControl } from '@angular/forms';

import { ngfModule, ngf } from "angular-file";
import { NgModule } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppSettings } from '../app.settings';
import { CommonhttpService } from '../shared/commonhttp.service';
import { PostsService } from './posts.service';
import { CategoryServices } from '../models/category-services';
import { States } from '../models/states';
import { Cities } from '../models/cities';
import { CustomValidators } from '../shared/custom.validations';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  /* Declare all necessary class variables */
  public colorTheme: any = 'theme-blue'; 
  public bsConfigStart: Partial<BsDatepickerConfig>;
  public bsConfigEnd: Partial<BsDatepickerConfig>;
  public startMinDate: Date;
  public endMinDate: Date;
  public angForm: FormGroup;
  public maxNumFilesExceeded: Boolean = false;
  public services_options: CategoryServices[];
  public state_options: States[];
  public city_options: Cities[];
  public minDateSt = new Date();
  public minDateEn = new Date();
  public maxDateSt = new Date();  
  public maxDateEn = new Date();
  public is_server_error = false;;

  /* File upload related variables */
  public accept  =  'image/*';
  public maxSize =  '2048000'; // size in bytes
  public files:File[]   =  [];
  public progress:number;
  public hasBaseDropZoneOver:boolean = false;
  public httpEmitter:Subscription;
  public lastFileAt:Date; 
  public sendableFormData:FormData;
  private postUrl     = '';
  public myFormData:FormData;
  public httpEvent:any;

  constructor(
    public HttpClient:HttpClient, public PostsService: PostsService, 
    private fb: FormBuilder, private CommonhttpService: CommonhttpService
  ) { 
    this.maxDateSt.setDate(this.minDateSt.getDate() + 90);
    this.maxDateEn.setDate(this.minDateEn.getDate() + 90);
    this.createForm();
  }

  ngOnInit() {
    /* Set datepicker background color */
    this.bsConfigStart = Object.assign({}, { containerClass: this.colorTheme });

    this.bsConfigEnd = Object.assign({}, { containerClass: this.colorTheme });

    this.postUrl = AppSettings.API_ENDPOINT + 'testUpload';

    /* Get service categories list to populate in the select box */
    this.CommonhttpService
        .getCategoryServices()
        .subscribe(
          (services_options:any) => {
            console.log('Posts component categories:', services_options.data);
            this.services_options = services_options.data;
          },
          (error: any) => {
            console.log('Component error while fetching services!', error);
            this.is_server_error = true;
          }
        );

    /* Get states list to populate in select box */
    this.CommonhttpService
        .getStates()
        .subscribe(
          (states:any) => {
            this.state_options = states.data;
          },
          (error) => {
            console.log('Component error while fetching states!', error);
            this.is_server_error = true;
          }
        )
  }

  /* Form group of add post form */
  createForm() {
    this.angForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      service_id: ['0', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      state_id: ['0', Validators.required],
      city_id: ['0', Validators.required],
      postcode: ['', [Validators.required, CustomValidators.checkPostcode]],
      budget: ['', [CustomValidators.checkAmount]]
    });
  }

  /* Return whether a specific form field is valid (true/false) */
  public isInvalid(field) : Boolean {
    return  this.angForm.controls[field].invalid && (this.angForm.controls[field].dirty || this.angForm.controls[field].touched);
  }

  /* Fetch all cities associated with selected state */
  public getCityFromState(state_id) {

    this.CommonhttpService
        .getCitiesFromStateId(state_id)
        .subscribe(
          (city_opts: any) => {
            this.city_options = city_opts.data;
          },
          (error) => {
            console.log('Component error while fetching cities!', error);
            this.is_server_error = true;
          }
        );

    this.angForm.controls['city_id'].setValue(0);
  }

  public convertDate(str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
  }

  /* When start date is selected, set this as min date for end date */
  public onStartDpValueChange(str) {
    if (str != null) {
      this.minDateEn = new Date(str);
    }    
  }

  /* When end date is selected, set this as max date for start date */
  public onEndDpValueChange(str) {
    if (str != null) {
      this.maxDateSt = new Date(str);
    }
  }

  /* Log input object data for debugging purpose */
  public log(obj) {
    console.log(this.angForm.controls);
  }

  /* Count files. Allow up to 5 files to be uploaded. */

  public filesCount() {
    if (this.files.length > 5) {
      this.maxNumFilesExceeded = true;
    } else {
      this.maxNumFilesExceeded = false;
    }
  }

  /* Add post function after submit */
  public submitPost() {

    Swal('Success!', 'Post saved successfully.', 'success');

    let formVal        = this.angForm.value;
    formVal.start_date = this.convertDate(formVal.start_date);
    formVal.end_date   = this.convertDate(formVal.end_date);

    const postFormData = new FormData();

    Object.keys(formVal).forEach((key) => {
      postFormData.append(key, formVal[key]);
    });
    

    if (this.files.length > 0) {
      this.files.forEach((val:any, key:any) => {        
        postFormData.append('post_images['+key+']', val);
      }); 
    }

    this.PostsService
        .addData(postFormData)
        .subscribe((data) => {
          console.log('Component subscribed:', data);
        });
  }

  cancel(){
    this.progress = 0
    if( this.httpEmitter ){
      console.log('cancelled')
      this.httpEmitter.unsubscribe()
    }
  }

  /* Test function to check multiple file upload */
 
  uploadFiles(files:File[]):Subscription {

    let postFormData = new FormData();

    if (files.length > 0) {
      files.forEach((val:any, key:any) => {
        postFormData.append(key, val);
      });     
    }

    var req = new HttpRequest<FormData>('POST', this.postUrl, postFormData, {
      reportProgress: true
    })
    
    return this.httpEmitter = this.HttpClient.request(req)
    .subscribe(
      event=>{
        this.httpEvent = event
        
        if (event instanceof HttpResponse) {
          delete this.httpEmitter
          console.log('request done', event)
        }
      },
      error=>console.log('Error Uploading',error)
    )
  }
 
  getDate(){
    return new Date()
  }
}
