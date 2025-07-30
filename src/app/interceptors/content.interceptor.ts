import { HttpInterceptorFn } from '@angular/common/http';

export const contentInterceptor: HttpInterceptorFn = (req, next) => {

  const contentReq = req.clone({
        setHeaders: {
          "Accept": "application/json",
        }
  })

  return next(contentReq);
};
