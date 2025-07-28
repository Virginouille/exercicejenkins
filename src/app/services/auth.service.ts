import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import User from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService: UserService = inject(UserService);

  user: User|null = null;

  constructor() { 
    this.verifyAuth();
  }

  //Metre des proprietes a certains état pour suivre le statu de connexion
  verifyAuth(){
    //Vérifier si un token est présent dans le storage
    const token:string | null = localStorage.getItem("token");
    if(token){
      // Je test le token en récupérant le User associé 
      this.userService.getCurrent(token).subscribe({
        // Un user à été récuperer
        next:(data: User)=>{
          // Je stocke mon User et renseigne l'état de l'application car User n'est plus null
          const user: User = data;
          console.log(user);
          //Initialisation du User 
          this.user = user;
          console.log("Utilisateur connecté:", user.email);
        },
        error:(error)=>{
          console.log(error);
          console.log("Token expiré ou invalide");
          this.logout();
        }
      });
    }else{
      this.user = null;
    }
  }

  logout(){
    // Suppression du token qui n'a pas fonctionné pour /me
    localStorage.removeItem("token");
    this.user = null;
  }

}
