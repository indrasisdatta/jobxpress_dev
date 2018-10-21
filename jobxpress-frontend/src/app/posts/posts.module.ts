import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsRoutingModule  } from "./posts-routing.module";
import { PostsComponent } from "./posts.component";
import { CommonhttpService } from '../shared/commonhttp.service';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { ngfModule, ngf } from "angular-file";
import { PostsService } from './posts.service';

@NgModule({
    imports: [
        CommonModule,          
        ReactiveFormsModule,
        FormsModule,
        PostsRoutingModule, 
        BsDatepickerModule.forRoot(),
        ngfModule
    ],
    declarations: [PostsComponent],
    providers: [CommonhttpService, PostsService]
})
export class PostsModule {
    constructor() {
        console.log('Posts module loaded!');
    }
}