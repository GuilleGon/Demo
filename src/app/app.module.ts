import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './pages/home/home.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotFoundModule } from './pages/not-found/not-found.module';

import { MaterialModule } from '@app/material.module';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { AuthInterceptorService } from './pages/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    NotFoundModule,
    MaterialModule,
    AppRoutingModule,
    SidebarModule,
    HttpClientModule,
  ],
  providers: [CheckLoginGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
