import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CustomLoaderComponent } from "../custom-loader/custom-loader.component";
import User from '../../../models/user.interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, CustomLoaderComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})
export class NavBarComponent implements OnInit{

    authService: AuthService = inject(AuthService);
    user:User|null = null;
    authInitialized: boolean = false;

     ngOnInit(): void {

    this.authService.initialized$.subscribe(initialized => {
      this.authInitialized = initialized;
      if (initialized) {
        console.log('Auth init:', this.authInitialized);
        //Chargement du user une fois l'auth initialisé
        this.loadUser();
      }
    });
  }

    //méthode pour charger le User
  private loadUser(): void {

    this.authService.user$.subscribe(user => {
      if (user) {
        //User connécté
        this.user = user;
        console.log('User loaded:', this.user);
      }
    });
  }
}

