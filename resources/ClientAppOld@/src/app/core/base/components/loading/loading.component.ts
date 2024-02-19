import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LoadingService } from "./loading.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  animations: [trigger('fadeAnimation', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(200)),
  ])]
})
export class LoadingComponent {

  isLoading = new BehaviorSubject<boolean>(false);
  constructor(private cd: ChangeDetectorRef,public ls: LoadingService) {}

  ngOnInit(){
    this.ls.isLoading$.subscribe(data=>{
      const pre = this.isLoading.getValue();
      this.isLoading.next(data);
      if(!pre && data === true){
        this.cd.detectChanges();
      }
    })
  }}
