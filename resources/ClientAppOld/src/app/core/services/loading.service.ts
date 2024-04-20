import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingStack = [] as boolean[];
  private isLoading = new Subject<boolean>();
  isLoading$ = this.isLoading.asObservable();

  show() {
    this.loadingStack.push(true);
    this.isLoading.next(true);
  }

  hide() {
    if (this.loadingStack.length > 0) {
      this.loadingStack.pop();
      if (this.loadingStack.length === 0)
        this.isLoading.next(false);
    }
  }

  forceHide() {
    this.loadingStack = [];
    this.isLoading.next(false);

  }
}
