import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { ErrorComponent }  from './error/error.component';
import { AuthGuard } from './auth/auth.guard';

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
    path: 'auth',
    loadChildren: '../app/auth/auth.module#AuthModule'
  },
  {
    path: 'user',
    loadChildren: '../app/user-account/user-account.module#UserAccountModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: ErrorComponent 
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
