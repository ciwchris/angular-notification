import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule

} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCardModule,
        MdInputModule,
        MdSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
