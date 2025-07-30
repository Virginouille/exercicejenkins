import { HttpContext, HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const IS_TOKEN_REQUIRED = new HttpContextToken<boolean>(() => false);

export const enableAuthContext: Function = ()=> {
  return new HttpContext().set(IS_TOKEN_REQUIRED, true);
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  console.log("AuthInterceptor:", req.url);
  //console.log("Body de la reponse",req.body);
  const token = localStorage.getItem("token");
  //Vérifier si la requete a besoin du token
  if (req.context.get(IS_TOKEN_REQUIRED) == true) {
    //Verifier User connectéou presence token ( en attendant )
    if (token) {
      //On clone la requete de base, pour y ajouter le header Authorization
      const authReq = req.clone({
        setHeaders: {
          "Authorization": "Bearer " + token,
        }
      })
      console.log(authReq.headers);
      return next(authReq);
    }
  }

  return next(req);


};
