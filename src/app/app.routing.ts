import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// router module
import { RouterModule } from '@angular/router';

// components
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './components/edit/edit.component';
import { UploadComponent } from './components/upload/upload.component';

const appRoutes = [
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'edit',
        component: EditComponent,
    },
    {
        path: 'upload',
        component: UploadComponent,
    },
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: SearchComponent,
    }
];


@NgModule({
    declarations: [
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ],
    providers: []
  })
  export class RoutingModule { }
