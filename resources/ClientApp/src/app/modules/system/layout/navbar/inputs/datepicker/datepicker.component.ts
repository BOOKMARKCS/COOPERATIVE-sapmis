import {Component, Input, OnInit} from '@angular/core';
import { format } from 'date-fns';
import { th, uk } from "date-fns/locale";
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [ NgForOf, NgClass, FormsModule ],
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {
  @Input() label: string = "Select Date";
  @Input() lang: any = 'en'
  @Input() inputFormControl: any;
  MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  showDatepicker: boolean = false;
  datepickerValue: string = '';
  month: number = 0;
  year: number = 0;
  no_of_days: number[] = [];
  blankDays: number[] = [];
  selectedDate: number = new Date().getDate();
  @Input() disable: boolean = false;

  constructor() {
    this.initDate();
    this.getNoOfDays();
  }

  ngOnInit() {
    if (this.lang == 'th') {
      this.MONTH_NAMES = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
      this.DAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
      this.datepickerValue = format(new Date(this.datepickerValue), 'yyyy-MM-dd');
    }
    this.datepickerValue = format(new Date(this.inputFormControl.value),'dd MMMM yyyy ', {locale: this.lang == 'th' ? th: uk})
  }

  initDate() {
    const today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
  }

  isToday(date: number): boolean {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString();
  }

  getDateValue(date: number) {
    const selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = format(selectedDate,'dd MMMM yyyy ', {locale: this.lang == 'th' ? th: uk})
    const formattedDate = selectedDate.getFullYear() + '-' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + selectedDate.getDate()).slice(-2);
    this.showDatepicker = false;
    this.selectedDate = selectedDate.getDate()
    this.inputFormControl.setValue(format(selectedDate, 'yyyy-MM-dd'));
  }

  changeMonth(step: number) {
    this.month += step;
    this.getNoOfDays();
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankDaysArray: number[] = [];
    for (let i = 1; i <= dayOfWeek; i++) blankDaysArray.push(i);
    const daysArray: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);
    this.blankDays = blankDaysArray;
    this.no_of_days = daysArray;
  }
}
