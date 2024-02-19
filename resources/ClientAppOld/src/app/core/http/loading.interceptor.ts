import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from "../pages/loading/loading.service";
import { finalize } from "rxjs";
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  inject(LoadingService).show();
  return next.caller(finalize(() => inject(LoadingService).hide()))
};
