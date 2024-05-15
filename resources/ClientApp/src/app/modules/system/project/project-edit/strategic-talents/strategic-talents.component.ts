import {Component, Input} from '@angular/core';
import {JsonPipe, NgForOf} from "@angular/common";
import {FormArray, FormControl} from "@angular/forms";
import { IStrategicTalent } from "../../../../../core/models/projectDetail/project-detail.model";
import { INameId } from "../../../../../shared/models/common";

interface StrategicTalent {
  id: number;
  name: string;
}

@Component({
  selector: 'app-strategic-talents',
  standalone: true,
  imports: [NgForOf, JsonPipe],
  templateUrl: './strategic-talents.component.html',
})
export class StrategicTalentsComponent {
  @Input() inputFormControl: any;
  @Input() data : INameId[] = []

  setStrategic(id: string) {
    const strategicTalentFormArray = this.inputFormControl as FormArray;
    if (strategicTalentFormArray) {
      const idIndex = strategicTalentFormArray.value.indexOf(id);
      idIndex !== -1 ? strategicTalentFormArray.removeAt(idIndex) : strategicTalentFormArray.push(new FormControl(id));
    }
  }
}
