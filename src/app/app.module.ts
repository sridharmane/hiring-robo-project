import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import { RoboAssistantService } from './roboAssistant.service';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'detail', component: SearchComponent },
  { path: 'detail/:robo_id', component: DetailComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailComponent,
    RatingStarsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule
  ],
  providers: [RoboAssistantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
