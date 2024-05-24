import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { ICongruenceIdentityGroupDetails } from "../../../../../core/models/projectDetail/project-detail.model";

interface CongruenceIdentityDetail {
  id: number;
  name: string;
  congruenceIdentityGroupsId: string;
  createdAt: string;
  updatedAt: string;
}


@Component({
  selector: 'app-congruence-identities',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './congruence-identities.component.html',
})
export class CongruenceIdentitiesComponent {
  @Input() inputFormControl: any
  @Input() data: ICongruenceIdentityGroupDetails[] = []
  count: any = []

  get getCount() {
    return this.inputFormControl.value.length
  }

  hasMatch(data: any): boolean {
    let detailId: any = []
    data.map((obj: any) => detailId.push(obj.id))
    return detailId.some((item: any) => this.inputFormControl?.value.includes(item))
  }

  setCongruenceIdentity(id: string, key: number) {
    if (!this.count) this.count = [];
    if (this.count[key] == null) this.count[key] = [];
    const c = this.count[key].find((cId: string) => cId === id);
    if (c === id) {
      const idIndex = this.count[key].indexOf(id);
      if (idIndex !== -1) this.count[key].splice(idIndex, 1);
    } else this.count[key].push(id);
    const congruenceIdentityDetailIdFormArray = this.inputFormControl as FormArray;
    if (congruenceIdentityDetailIdFormArray) {
      const idIndex = congruenceIdentityDetailIdFormArray.value.indexOf(id);
      idIndex !== -1 ? congruenceIdentityDetailIdFormArray.removeAt(idIndex) : congruenceIdentityDetailIdFormArray.push(new FormControl(id));
    }
  }
}
