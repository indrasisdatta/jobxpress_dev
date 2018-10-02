import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';

/* Define lazy loaded routes here */

const appRoutes: Routes = [
  {
    path: 'posts',
    loadChildren: '../app/posts/posts.module#PostsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/posts'
  },
  {
    path: '**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {
    //   preloadingStrategy: PreloadAllModules
    // }) 
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
