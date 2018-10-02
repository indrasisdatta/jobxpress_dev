import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormGroup, FormControl, FormBuilder,  Validators, AbstractControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { 
    this.startMinDate = new Date();
    this.endMinDate   = new Date();
    this.createForm();
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
      location: ['', Validators.required],
      budget: [''],
    });
  }

  /* Return whether a specific form field is valid (true/false) */
  public isInvalid(field) : Boolean {
    return  this.angForm.controls[field].invalid && (this.angForm.controls[field].dirty || this.angForm.controls[field].touched);
  }

  /* Log input object data for debugging purpose */
  log(obj) {
    console.log(obj);
  }

  /* Add post function after submit */
  addPostSubmit(formData) {
    console.log(formData);
  }
}
