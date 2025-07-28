import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  authService: AuthService = inject(AuthService);
  
  activeTab: string = 'info';

}
