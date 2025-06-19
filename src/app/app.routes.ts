import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'annoucement/:id', component: AnnouncementDetailComponent },
  { path: '**', redirectTo: '' },

];
