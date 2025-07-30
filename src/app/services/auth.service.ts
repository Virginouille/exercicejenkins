import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import User from '../models/user.interface';
import { BehaviorSubject, delay } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService: UserService = inject(UserService);
  private router : Router = inject(Router); // Pour la redirection

  private initializedSubject = new BehaviorSubject<boolean>(false);
  public initialized$ = this.initializedSubject.asObservable();
  //Utilisation d'un observable pour partager la prop User aux autre composants
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  //Le $ en fin de variable est une convention pour identifier les data observable

  //Getter pour la simplicité d'utilisation
  get user(): User | null {
    return this.userSubject.value;
  }

  // Setter pour mettre à jour l'observable utilisateur
  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

    get initialized(): boolean {
    return this.initializedSubject.value;
  }

  // Setter pour mettre à jour l'observable utilisateur
  setInitialized(state: boolean): void {
    this.initializedSubject.next(state);
  }

  constructor() {
    this.verifyAuth();
  }

  //Metre des proprietes a certains état pour suivre le statu de connexion
  verifyAuth(redirectRoute: string | null = null){
    //Vérifier si un token est présent dans le storage
    const token:string | null = localStorage.getItem("token");
    if(token){
      // Je test le token en récupérant le User associé
      this.userService.getCurrent().subscribe({
        // Un user à été récuperer
        next:(data: User)=>{
          // Je stocke mon User et renseigne l'état de l'application car User n'est plus null
          console.log(data);
          //Initialisation du User
          this.setUser(data);
          this.setInitialized(true);
          if(redirectRoute){
            //Redirection Home / profile
            this.router.navigate([redirectRoute]);
          }
        },
        error:(error)=>{
          console.log(error);
          console.log("Token expiré ou invalide");
          this.setInitialized(true);
          this.logout();
        },

      });
    }else{
      this.setInitialized(true);
      this.setUser(null);
    }
  }

  logout(){
    // Suppression du token qui n'a pas fonctionné pour /me
    localStorage.removeItem("token");
    this.setUser(null);
    this.router.navigate(["login"]);
  }

}
