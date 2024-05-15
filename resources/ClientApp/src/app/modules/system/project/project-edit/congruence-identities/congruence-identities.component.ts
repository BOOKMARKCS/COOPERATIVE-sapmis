import { Component, Input, NgIterable } from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {JsonPipe, NgForOf} from "@angular/common";
import { ICongruenceIdentity, ICongruenceIdentityGroupDetails } from "../../../../../core/models/projectDetail/project-detail.model";

interface CongruenceIdentityDetail {
  id: number;
  name: string;
  congruenceIdentityGroupsId: string;
  createdAt: string;
  updatedAt: string;
}

interface CongruenceIdentity {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  congruenceIdentityDetail: CongruenceIdentityDetail[];
}

@Component({
  selector: 'app-congruence-identities',
  standalone: true,
  imports: [NgForOf, JsonPipe],
  templateUrl: './congruence-identities.component.html',
})
export class CongruenceIdentitiesComponent {
  @Input() inputFormControl: any;
  @Input() data: ICongruenceIdentityGroupDetails[] = []
  count: any = []

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

  protected readonly parseInt = parseInt;
}
