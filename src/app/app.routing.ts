import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './components/edit/edit.component';

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
