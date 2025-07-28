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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);

  formSubmitted: boolean = false;
  inputPWType: string = 'password';
  loginForm: FormGroup; // Represente mon formulaire <form>

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

    if (this.loginForm.valid) {
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
          this.authService.verifyAuth();
        },
        error: (error) => {
          console.log("Erreur",error.error.message);
        },
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    // Retourne true si TOUTES ces conditions sont vraies :
    //    champ existe ET champ invalide ET (champ dirty OU touched OU formulaire est soumis)
    return Boolean(field && field.invalid && field.touched && this.formSubmitted);
    // Boolean() créer un booléen d'après une donnée falsy ou truthy
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    // Vérifier si le champ existe et a des erreurs
    if (field && field.errors) {
      // field.errors est un objet avec les types d'erreurs comme clés
      // Ex: { required: true, email: true, minlength: { requiredLength: 6, actualLength: 3 } }
      if (field.errors['required']) {
        if(fieldName =="motDePasse")
        return `Le mot de passe est obligatoire`;
      }
      if (field.errors['email']) {
        return 'Format email invalide';
      }
      if (field.errors['minlength']) {
        // L'erreur minlength contient des infos détaillées
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
    }
    return '';
  }
}
