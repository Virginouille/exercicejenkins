import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../models/user.interface';
import { enableAuthContext, IS_TOKEN_REQUIRED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  private httpClient: HttpClient = inject(HttpClient);

  login(user: Partial<User>) {
    return this.httpClient.post('https://atelier-de-toril.fr/' + 'auth', user);
  }

  getCurrent() {
    return this.httpClient.get<User>('https://atelier-de-toril.fr/' + 'api/me', {
      context: enableAuthContext(),
    });
  }

}
