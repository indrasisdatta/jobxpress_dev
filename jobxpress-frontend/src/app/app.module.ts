import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AuthService } from './auth/auth.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

import { PostsRoutingModule } from './posts/posts-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component';

import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ErrorComponent
  ],
  providers: [
    AuthService,
    GlobalErrorHandlerService,
    AuthGuard,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    console.log('App Module loaded');
  }
}
