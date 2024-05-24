import { AfterContentChecked, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CalendarModule } from "primeng/calendar";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./durations.component.sass'],
})
export class DurationsComponent implements AfterContentChecked,  OnInit, OnChanges {
  @Input() label: string = '';
  @Input() inputFormControl: any;
  dates: any = [];
  minDate: Date = new Date(new Date().getFullYear() + 543, new Date().getMonth(), new Date().getDate());

  private initialized: boolean = false; // Flag to indicate initialization status

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.inputFormControl?.value) {
        this.dates = [];
        this.inputFormControl.value.forEach((val: any) => {
          if (val instanceof Date) {
            this.dates.push(new Date(val.getFullYear() + 543, val.getMonth(), val.getDate()));
          }
        });
        this.cdRef.detectChanges(); // Trigger change detection
      }
      console.log('OnInit', this.inputFormControl.value);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dates'] && changes['dates'].currentValue) {
      console.log('update');
    }
  }

  ngAfterContentChecked() {
    if (!this.initialized) { // Check if already initialized
      setTimeout(() => {
       this.dates = []
        this.inputFormControl.value.forEach((val: any) => {
          let date: Date;
          if (val instanceof Date) {
            date = val;
          } else {
            date = new Date(val);
          }
          this.dates.push(new Date(date.getFullYear() + 543, date.getMonth(), date.getDate()));
        });
        if(this.dates.length >= 1) this.initialized = true; // Set the flag to true to prevent future execution
      }, 5000); // Delay of 10 seconds
    }
  }

  processSortedDates(): void {
    setTimeout(() => {
      this.inputFormControl.clear();
      const sortedDates = this.dates.slice().sort((a: any, b: any) => a - b);
      sortedDates.forEach((date: any) => {
        this.inputFormControl.push(new FormControl(date));
      });
      this.cdRef.detectChanges(); // Trigger change detection
    }, 0);
  }
}
