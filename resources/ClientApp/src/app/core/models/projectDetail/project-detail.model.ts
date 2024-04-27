import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import {IUser, User} from "../auth/user.model";

export class ProjectDetail {
  id = new FormControl(null)
  projectId = new FormControl(null)
  projectName = new FormControl(null, Validators.required)
  activityGroupName = new FormControl(null)
  responsibleStudents = new FormArray([new FormGroup(new ResponsibleStudent())], Validators.required);
  projectAdvisors = new FormArray([new FormGroup(new ProjectAdvisor())], Validators.required)
  tsuTalent = new FormGroup(new TsuTalent())
  strategicTalent = new FormGroup(new StrategicTalent())
  congruenceIdentity = new FormGroup(new CongruenceIdentity())
  background = new FormControl(null)
  objectives = new FormArray([new FormControl(null)])
  activityFormats = new FormArray([new FormControl(null)])
  projectParticipant = new FormGroup(new ProjectParticipant())
  location = new FormControl(null)
  durationStart = new FormControl(new Date())
  durationEnd = new FormControl(new Date())
  operations = new FormArray([new FormControl(null)])
  budget = new FormGroup(new Budget())
  expectedResults = new FormArray([new FormControl(null)])
  kpi = new FormGroup(new Kpi())
  evaluates = new FormArray([new FormControl(null)])
}


export interface IResponsibleStudent {
  id : string
  projectDetailId : string
  user : IUser
  status : string
}
export class ResponsibleStudent {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  user = new FormGroup(new User(), Validators.required)
  status = new FormControl(false)
}

export interface IProjectAdvisor {
  id : string
  projectDetailId : string
  user : IUser
  status : string
}
export class ProjectAdvisor {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  user = new FormGroup(new User())
  status = new FormControl(false)
}

export class TsuTalent {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  tsuTalentDetailId = new FormArray([])
}

export class StrategicTalent {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  strategicTalentDetailId = new FormArray([])
}

export class CongruenceIdentity {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  congruenceIdentityDetailId = new FormArray([])
}

export class ProjectParticipant {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  advisor = new FormArray([new FormControl(), new FormControl()]) // 0: ผู้ชาย, 1: ผู้หญิง
  student = new FormArray([new FormControl(), new FormControl()]) // 0: ผู้ชาย, 1: ผู้หญิง
  other = new FormArray([new FormControl(), new FormControl()])
}


export class Budget {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  costDetails = new FormArray([new  FormControl(null)])
  costAmounts = new FormArray([new FormControl(null)])
  remunerationDetails = new FormArray([new FormControl(null)])
  remunerationAmounts = new FormArray([new FormControl(null)])
  equipmentCostDetails = new FormArray([new FormControl(null)])
  equipmentCostAmounts = new FormArray([new FormControl(null)])
  other = new FormControl(null)
}

export class Kpi {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  quantity = new FormArray([new FormControl(null)])
  quality = new FormArray([new FormControl(null)])
}

export class ProjectApproval {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  userId = new FormControl(null)
  comment = new FormControl(null)
  organizationId = new FormControl(null)
  status = new FormControl(false)
}


