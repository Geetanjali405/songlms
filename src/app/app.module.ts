import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule,FormsModule ,FormBuilder,FormControl} from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { AddsongComponent } from './addsong/addsong.component';
import { DeletesongComponent } from './deletesong/deletesong.component';

@NgModule({
  declarations: [
    AppComponent,
    AddsongComponent,
    DeletesongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
