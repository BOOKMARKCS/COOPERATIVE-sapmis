import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { LoadingService } from "./loading.service";
import { AsyncPipe, CommonModule, NgIf } from "@angular/common";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ AsyncPipe, NgIf, BrowserAnimationsModule,NoopAnimationsModule ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.sass'
})
export class LoadingComponent implements OnInit{

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private cd: ChangeDetectorRef, public ls: LoadingService) { }
  ngOnInit() {
    this.ls.isLoading$.subscribe(data => {
      const pre = this.isLoading.getValue();
      this.isLoading.next(data);
      if (pre === false && data === true) {
        this.cd.detectChanges();
      }
    })
  }
}
