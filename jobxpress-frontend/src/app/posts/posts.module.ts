import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule  } from "./posts-routing.module";
import { PostsComponent } from "./posts.component";

import { BsDatepickerModule } from 'ngx-bootstrap';

import { ngfModule, ngf } from "angular-file";

@NgModule({
    imports: [
        CommonModule,          
        ReactiveFormsModule,
        FormsModule,
        PostsRoutingModule, 
        BsDatepickerModule.forRoot(),
        ngfModule
    ],
    declarations: [PostsComponent]
})
export class PostsModule {
    constructor() {
        console.log('Posts module loaded!');
    }
}