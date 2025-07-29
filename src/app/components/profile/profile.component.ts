import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomLoaderComponent } from "../parts/custom-loader/custom-loader.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CustomLoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  private authService: AuthService = inject(AuthService);
  private router : Router = inject(Router); // Pour la redirection

  activeTab: string = 'info';
  user:User|null = null;

    ngOnInit(): void {

        this.authService.user$.subscribe(user => {
          if(user){
            this.user = user;
            console.log('User loaded:', this.user);
          }else{
            this.router.navigate(["login"]);
          }
        });
    }
}
