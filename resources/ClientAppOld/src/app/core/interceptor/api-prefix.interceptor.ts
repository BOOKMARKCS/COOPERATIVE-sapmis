import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../../environments/environment";

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  if (!/^(http|https):/i.test(req.url)  && !req.url.includes('assets')) {
   req = req.clone({ url: `${environment.apiUrl}/api/${req.url}`});
  }
  return next(req);
};
