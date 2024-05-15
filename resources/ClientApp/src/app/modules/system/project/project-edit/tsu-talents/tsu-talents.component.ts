import { Component, Input } from '@angular/core';
import { JsonPipe, NgForOf } from "@angular/common";
import { FormArray, FormControl } from "@angular/forms";
import { ITsuTalentGroupDetails } from "../../../../../core/models/projectDetail/project-detail.model";

interface TalentDetail {
  id: number;
  name: string;
  tsuTalentGroupId: string;
  createdAt: string;
  updatedAt: string;
}

interface TsuTalent {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  talentDetails: TalentDetail[];
}

@Component({
  selector: 'app-tsu-talents',
  standalone: true,
  imports: [NgForOf, JsonPipe],
  templateUrl: './tsu-talents.component.html',
})
export class TsuTalentsComponent {
  @Input() inputFormControl: any;
  @Input() data : ITsuTalentGroupDetails[] = []

  setTsuTalent(id: string, index: number) {
    const tsuTalentDetailIdFormArray = this.inputFormControl as FormArray;
    if (tsuTalentDetailIdFormArray) {
      const idIndex = tsuTalentDetailIdFormArray.value.indexOf(id);
      idIndex !== -1 ? tsuTalentDetailIdFormArray.removeAt(idIndex) : tsuTalentDetailIdFormArray.push(new FormControl(id));
    } else console.error('FormArray tsuTalentDetailId not found or not instance of FormArray');
  }
}
