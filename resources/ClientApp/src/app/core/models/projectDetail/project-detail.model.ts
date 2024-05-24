import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IUser, User } from "../auth/user.model";

// export interface IProjectDetail {
//   id : string
//   projectId : string
//   projectName : string
//   activityGroupName : string
//   responsibleStudents : string
//   projectAdvisors : string
//   tsuTalent : string
//   strategicTalent : string
//   congruenceIdentity : string
//   background : string
//   objectives : string
//   activityFormats : string
//   projectParticipant : string
//   location : string
//   duration : string
//   operations : string
//   budget : string
//   expectedResults : string
//   kpi : string
//   evaluates : string
//   createdAt : string
// }
export interface IProjectDetail {
  id: string;
  projectId: string;
  projectName: string;
  activityGroupName: string;
  responsibleStudents: IResponsibleStudent[];
  projectAdvisors: IProjectAdvisor[];
  tsuTalent: ITsuTalent;
  strategicTalent: IStrategicTalent;
  congruenceIdentity: ICongruenceIdentity;
  background: string;
  objectives: string[]; // เปลี่ยนเป็น array
  activityFormats: string[]; // เปลี่ยนเป็น array
  projectParticipant: IProjectParticipant;
  location: string;
  duration: Date[];
  operations: string[]; // เปลี่ยนเป็น array
  budget: IBudget;
  expectedResults: string[]; // เปลี่ยนเป็น array
  kpi: IKpi;
  evaluates: string[]; // เปลี่ยนเป็น array
  createdAt: string;
}


export class ProjectDetail {
  id = new FormControl(null)
  projectId = new FormControl(null)
  projectName = new FormControl(null, Validators.required)
  activityGroupName = new FormControl(null)
  responsibleStudents = new FormArray<FormGroup<ResponsibleStudent>>([], Validators.required);
  projectAdvisors = new FormArray<FormGroup<ProjectAdvisor>>([], Validators.required)
  tsuTalent = new FormGroup(new TsuTalent())
  strategicTalent = new FormGroup<StrategicTalent>(new StrategicTalent())
  congruenceIdentity = new FormGroup<CongruenceIdentity>(new CongruenceIdentity())
  background = new FormControl(null)
  objectives = new FormArray<FormControl<string>>([])
  activityFormats = new FormArray<FormControl<string>>([])
  projectParticipant = new FormGroup<ProjectParticipant>(new ProjectParticipant())
  location = new FormControl(null)
  duration = new FormArray([])
  operations = new FormArray<FormControl<string>>([])
  budget = new FormGroup<Budget>(new Budget())
  expectedResults = new FormArray<FormControl<string>>([])
  kpi = new FormGroup(new Kpi())
  evaluates = new FormArray<FormControl<string>>([])
  createdAt = new FormControl(null)
}


export interface IResponsibleStudent {
  id: string
  projectDetailId: string
  studentId : string
  userId : string
  user: IUser
  status: string
}

export class ResponsibleStudent {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  status = new FormControl(false)
  studentId = new FormControl(null)
  userId = new FormControl(null)
  user = new FormGroup(new User(), Validators.required)
}

export interface IProjectAdvisor {
  id: string
  projectDetailId: string
  user: IUser
  status: string
}

export class ProjectAdvisor {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  user = new FormGroup(new User())
  status = new FormControl(false)
}


export interface ITsuTalentDetail {
  id: string,
  name: string,
  tsuTalentGroupId: string
}

export interface ITsuTalentGroupDetails {
  name: string,
  talentDetails: ITsuTalentDetail[]
}

export interface ITsuTalent {
  id: string,
  projectDetailId: string,
  tsuTalentDetailId: Array<string>
}

export class TsuTalent {
  projectDetailId = new FormControl(null)
  tsuTalentDetailId = new FormArray<FormControl<string>>([])
}

export interface IStrategicTalent {
  projectDetailId: string
  strategicTalentDetailId: Array<string>
}

export class StrategicTalent {
  projectDetailId = new FormControl(null)
  strategicTalentDetailId = new FormArray([])
}
export interface ICongruenceIdentityDetail {
  id : string
  name : string
  congruenceIdentityGroupId  : string[]
}

export interface ICongruenceIdentityGroupDetails {
  id : string
  name: string
  congruenceIdentityDetail : ICongruenceIdentityDetail[]
}
export interface ICongruenceIdentity {
  projectDetailId: string
  congruenceIdentityDetailId: Array<string>
}

export class CongruenceIdentity {
  projectDetailId = new FormControl(null)
  congruenceIdentityDetailId = new FormArray([])
}

export interface IProjectParticipant {
  id: string;
  projectDetailId: string;
  advisor: string[]; // เปลี่ยนเป็น array
  student: string[]; // เปลี่ยนเป็น array
  other: string[]; // เปลี่ยนเป็น array
}
export class ProjectParticipant {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  advisor = new FormArray([new FormControl(), new FormControl()]) // 0: ผู้ชาย, 1: ผู้หญิง
  student = new FormArray([new FormControl(), new FormControl()]) // 0: ผู้ชาย, 1: ผู้หญิง
  other = new FormArray([new FormControl(), new FormControl()])
}

export interface IBudget {
  id: string;
  projectDetailId: string;
  costDetails: string[]; // เปลี่ยนเป็น array
  costAmounts: string[]; // เปลี่ยนเป็น array
  remunerationDetails: string[]; // เปลี่ยนเป็น array
  remunerationAmounts: string[]; // เปลี่ยนเป็น array
  equipmentCostDetails: string[]; // เปลี่ยนเป็น array
  equipmentCostAmounts: string[]; // เปลี่ยนเป็น array
  other: string;
}
export class Budget {
  id = new FormControl(null)
  projectDetailId = new FormControl(null)
  costDetails = new FormArray([new FormControl(null)])
  costAmounts = new FormArray([new FormControl(null)])
  remunerationDetails = new FormArray([new FormControl(null)])
  remunerationAmounts = new FormArray([new FormControl(null)])
  equipmentCostDetails = new FormArray([new FormControl(null)])
  equipmentCostAmounts = new FormArray([new FormControl(null)])
  other = new FormControl(null)
}

export interface IKpi {
  id: string;
  projectDetailId: string;
  quantity: string[]; // เปลี่ยนเป็น array
  quality: string[]; // เปลี่ยนเป็น array
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

export interface IMaster {
  tsuTalents: ITsuTalentGroupDetails[]
  tsuTalentDetail: IStrategicTalent
  congruenceIdentities: ICongruenceIdentityGroupDetails[]
  responsibleStudents: IUser[]
  projectAdvisors: IUser[]
}
