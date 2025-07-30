import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AnnouncementSearchComponent } from './components/announcement-search/announcement-search.component';
import { CreateAnnouncementComponent } from './components/create-announcement/create-announcement.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'search', component: AnnouncementSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'announcement/:id', component: AnnouncementDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'announcement-create', component: CreateAnnouncementComponent },
  { path: '**', redirectTo: '' },

];
