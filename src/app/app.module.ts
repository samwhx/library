import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './components/edit/edit.component';

// reactive forms
import { ReactiveFormsModule } from '@angular/forms';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// services
import { SearchService } from './services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// routing
import { RoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    RoutingModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
