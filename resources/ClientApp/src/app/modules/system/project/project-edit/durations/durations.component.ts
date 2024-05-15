import { Component } from '@angular/core';
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  styleUrls: ['./durations.component.sass'],
})
export class DurationsComponent {
  dates: any;
}
