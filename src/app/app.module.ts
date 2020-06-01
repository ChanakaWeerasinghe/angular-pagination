import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent }  from './app.component';
 import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {DemoMaterialModule} from './material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { PagerService } from './services/pager.service';

@NgModule({
    imports: [
      MatSliderModule,
      DemoMaterialModule,
      MatButtonModule,
        BrowserModule,
        FormsModule,
        Ng2SearchPipeModule,
        HttpModule
    ],
     declarations: [
        AppComponent
    ],
    providers: [
        PagerService,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }