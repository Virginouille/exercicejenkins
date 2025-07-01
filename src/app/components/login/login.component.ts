import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  inputPWType: string = "password";
  loginForm:FormGroup; // Represente mon formulaire <form>
  formBuilder:FormBuilder = inject(FormBuilder);

  constructor(){
    // Création du formGroup
    this.loginForm = this.formBuilder.group({
      myControl1: ['',[Validators.required,Validators.email]],
      myControl2: ['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }


  togglePW() {
    if(this.inputPWType === "password"){
      this.inputPWType = "text";
    }else{
      this.inputPWType = "password";
    }
  }
  monFormEstSoumis(){
    // console.log("MON FORM EST SOUMIS");
    // console.log("loginForm.valid ",this.loginForm.valid);
    // console.log("Toutes les valeurs des control du groupe -> loginForm.value ",this.loginForm.value);
    // console.log("Recuperer un seul control avec loginForm.get('myControl1')",this.loginForm.get("myControl2"));
    // console.log("Recuperer la validité d'un control avec loginForm.get('myControl2').valid",this.loginForm.get("myControl1")?.valid);
    // console.log("Recuperer les erreurs d'un control avec loginForm.get('myControl2').errors",this.loginForm.get("myControl2")?.errors);
    // console.log("Recuperer un seul control avec loginForm.get('myControl2')",this.loginForm.get("myControl2"));

    if(this.loginForm.valid){

      console.log("Form valide je peux envoyé la requete de login a l'api");
      
    }

  }


}
