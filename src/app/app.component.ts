import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "./components/parts/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/parts/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import User from './models/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  
  // En injectant le Service dans App, 
  // le constructeur de AuthService initialisera l'authentification
  authService: AuthService = inject(AuthService);

  title = 'my-bad-location';

  constructor(){
  }


}
