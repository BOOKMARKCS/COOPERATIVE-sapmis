import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-project-participant',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
  templateUrl: './project-participant.component.html',
})
export class ProjectParticipantComponent {
  @Input() inputFormControl: any

  sumArray = (arr: any[]): number => arr.reduce((acc, val) => acc + (+val || 0), 0);

  sumProjectParticipant = (): number => ['advisor', 'student', 'other'].reduce((acc, key) => acc + this.sumArray(this.inputFormControl.get(['projectDetail', 'projectParticipant', key]).value), 0);
}
