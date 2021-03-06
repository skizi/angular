import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SubComponent } from './sub.component';
import { PopupComponent } from './popup.component';

import { TestService }          from './test.service';

@NgModule({
  declarations: [
    AppComponent,
    SubComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
