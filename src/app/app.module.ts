import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ItemscananddetailComponent } from './itemscananddetail/itemscananddetail.component';
import { ItemDetailsComponent } from './itemscananddetail/itemdetails.component';
import { LocationComponent } from './location/location.component';
import { BarcodeComponent } from './barcode/barcode.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemDetailsComponent,
    ItemscananddetailComponent,
    BarcodeComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    RecaptchaModule.forRoot(),
    RouterModule.forRoot([
      { path: 'application/home', component: HomeComponent},
      { path: 'application/items', component: ItemscananddetailComponent},
      { path: 'application/barcode', component: BarcodeComponent},
      { path: '**', redirectTo: 'application/items', pathMatch: 'full' }

  ], { useHash: true /*preloadingStrategy: CustomPreloadingStrategy*/ })
  ],
  providers: [
    HttpService,
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
