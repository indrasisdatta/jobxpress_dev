import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent }  from './posts.component';
import { PostListComponent }  from './post-list/post-list.component';

const postRoutes: Routes = [
	{ 
	    path: '',
        component: PostsComponent,
        // children: [ 
        //     {
        //         path: 'post-list',
        //         component: PostListComponent
        //     }  
        // ]
	}	
];

@NgModule({
  imports: [ RouterModule.forChild(postRoutes) ],
  exports: [ RouterModule ]
})
export class PostsRoutingModule { 

    constructor() {
        console.log('Posts routing loaded');
    }
} 