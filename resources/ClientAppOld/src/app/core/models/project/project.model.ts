import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

export interface IProject {

}

export class Project {
  id = new FormControl(null)
  userId = new FormControl(null)
  academicYear = new FormControl(null)
  status = new FormControl(null)
  projectType = new FormControl(null)
}
// export class Project {
//   projectId = new FormControl('A')
//   projectName = new FormControl('A')
//   activityGroupName = new FormControl('A')
//   responsibleStudents = new FormArray([new FormGroup({
//     studentId: new FormControl('A', [Validators.required]),
//     name: new FormControl('A', [Validators.required]),
//     phoneNumber: new FormControl('A', [Validators.required])
//   })])
//   advisorNames: any = new FormArray([new FormGroup({
//     name: new FormControl('A', [Validators.required]),
//     phoneNumber: new FormControl('A', [Validators.required])
//   })])
//   tsuTalentId = new FormControl('A')
//   tsuTalent = new FormGroup<any>({
//     tsuGlobalTalent: new FormArray<any>([]),
//     tsuCommunicationTalent: new FormArray<any>([]),
//     tsuSocialInnovationEntrepreneurshipTalent: new FormArray<any>([])
//   })
//   strategicTalentId = new FormArray([new FormControl('1'), new FormControl('2')])
//   congruenceIdentityId = new FormControl('1')
//   background = new FormControl('A')
//   objectives = new FormArray([new FormControl('A')])
//   activityFormats = new FormArray([new FormControl('A')])
//   projectParticipantId = new FormControl('A')
//   location = new FormControl('A')
//   durationStart = new FormControl(new Date().toISOString().slice(0, 10))
//   durationEnd = new FormControl(new Date().toISOString().slice(0, 10))
//   operation = new FormArray([new FormControl('A')])
//   budgetId = new FormControl('A')
//   budgets = new FormArray<any>([new FormGroup<any>({
//     budgetCode: new FormControl(0, [Validators.required]),
//     projectId: new FormControl('A', [Validators.required]),
//     costDetails: new FormArray<any>([new FormControl('A', [Validators.required])]),
//     costAmount: new FormArray<any>([new FormControl(0, [Validators.required])]),
//     remunerationDetails: new FormArray<any>([new FormControl('A', [Validators.required])]),
//     remunerationAmount: new FormArray<any>([new FormControl(0, [Validators.required])]),
//     equipmentCostDetails: new FormArray<any>([new FormControl('A', [Validators.required])]),
//     equipmentCostAmount: new FormArray<any>([new FormControl(0, [Validators.required])]),
//     otherDetails: new FormArray<any>([new FormControl('A', [Validators.required])]),
//     otherAmount: new FormArray<any>([new FormControl(0, [Validators.required])]),
//   })]);
//   expectedResults = new FormArray([new FormControl])
//   kpiId = new FormControl('A')
//   kpi = new FormGroup({
//     quantity: new FormArray<any>([new FormControl('A', [Validators.required])]),
//     quality: new FormArray<any>([new FormControl('A', [Validators.required])]),
//   });
//   evaluate = new FormArray([new FormControl('A')])
//   status = new FormControl('A')
// }
