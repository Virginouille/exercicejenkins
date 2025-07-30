import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormControlErrorComponent } from "../parts/form-control-error/form-control-error.component";
import { Router } from '@angular/router';
import { CustomLoaderComponent } from "../parts/custom-loader/custom-loader.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormControlErrorComponent, CustomLoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private router : Router = inject(Router); // Pour la redirection

  formSubmitted: boolean = false;
  inputPWType: string = 'password';
  loginForm: FormGroup; // Represente mon formulaire <form>
  isLoading: boolean = false;

  apiError: string|null = null;

  constructor() {
    // Création du formGroup
    this.loginForm = this.formBuilder.group({
      //Un formControl pour chaque champ <input> du form
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(2)]],
    });

    if(this.authService.user){
      console.log("Deja connecté");
      //Redirection

    }
  }

  togglePW() {
    if (this.inputPWType === 'password') {
      this.inputPWType = 'text';
    } else {
      this.inputPWType = 'password';
    }
  }

  monFormEstSoumis() {
    // console.log('MON FORM EST SOUMIS');
    // console.log('loginForm.valid ', this.loginForm.valid);
    // console.log(
    //   'Toutes les valeurs des control du groupe -> loginForm.value ',
    //   this.loginForm.value
    // );
    // console.log(
    //   "Recuperer un seul control avec loginForm.get('email')",
    //   this.loginForm.get('email')
    // );
    // console.log(
    //   "Recuperer la validité d'un control avec loginForm.get('password').valid",
    //   this.loginForm.get('email')?.valid
    // );
    // console.log(
    //   "Recuperer les erreurs d'un control avec loginForm.get('password').errors",
    //   this.loginForm.get('password')?.errors
    // );
    // console.log(
    //   "Recuperer un seul control avec loginForm.get('password')",
    //   this.loginForm.get('password')
    // );

    this.formSubmitted = true;
    this.apiError = null;

    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log(
        "Form valide je peux envoyer la requete de login a l'api /auth"
      );

      // Appel de la méthode du service
      this.userService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          //Récupération du token
          console.log(data.token);
          // Stocker le token en localStorage ( meme syntaxe qu'en JS )
          localStorage.setItem("token",data.token);
          this.authService.verifyAuth("profile");

        },
        error: (error) => {
          console.log("Erreur",error.error.message);
          this.isLoading = false;
          this.apiError = error.error.message;
        },
      });


    }
  }


}
