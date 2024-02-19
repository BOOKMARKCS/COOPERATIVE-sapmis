import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RowState } from "../../stateManagement/rowState";
import { Attendants } from "../../../../data/proj/project.model";
import { IUser, User } from "../account/User";
import { Budget } from "./Budget";
import { IApproved } from "./approved";


export interface IProject {
  activityFormats: string;
  activityGroupName: string;
  advisorNames: [{
    name: string
    phoneNumber: string
  }]
  agendaFile: string;
  attendantCode: number;
  attendants: [{
    attendantCode: number;
    projectId: string;
    advisorCount: { Male: number, Female: number };
    studentCount: { Male: number, Female: number };
    teacherCount: { Male: number, Female: number };
    otherCounts: [{ Male: number, Female: number }];
    otherDetails: string[];
  }]
  background: string;
  budgetCode: number;
  budgets: [{
    budgetCode: number;
    projectReportId: string;
    costDetails: string[];
    costAmount: number[];
    remunerationDetails: string[];
    remunerationAmount: number[];
    equipmentCostDetails: string[];
    equipmentCostAmount: number[];
    otherDetails: string[];
    otherAmount: number[];
  }]
  endTime: Date;
  evaluate: string[];
  expectedOutcomes: string[];
  kpi: {
    quantity: string[];
    quality: [];
  }
  location: string;
  objectives: string[];
  operation: string[];
  preStatus: string;
  projectId: string
  projectName: string;
  reportSubmissionDeadline: Date;
  responsibleStudents: [{
    studentId: string;
    name: string;
    phoneNumber: string;
  }]
  rowState: RowState;
  startTime: Date;
  status: string;
  strategyId: string;
  strategicDetail: string;
  tsuTalent: {
      tsuGlobalTalent: string[];
      tsuCommunicationTalent: string[];
      tsuSocialInnovationEntrepreneurshipTalent: string[];
  };
  users: IUser;
  userId: string;
  approved: IApproved;
  createdDate: Date;
  updatedDate: Date;
  totalBudget: number;
}


export class Project {
  activityFormats: any = new FormArray<any>([new FormControl('', [Validators.required])]);
  activityGroupName: any = new FormControl('', [Validators.required]);
  advisorNames: any = new FormArray([new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  })])
  agendaFile: any = new FormControl('');
  attendantCode: number = 0;
  attendants: any = new Attendants().attendants;
  background: any = new FormControl('', [Validators.required]);
  budgetCode: number = 0;
  budgets: any = new Budget().budgets;
  endTime: any = new FormControl(new Date());
  evaluate: any = new FormArray<any>([new FormControl('', [Validators.required])]);
  expectedOutcomes: any = new FormArray<any>([new FormControl('', [Validators.required])]);
  kpi: any = new FormGroup({
    quantity: new FormArray<any>([new FormControl('', [Validators.required])]),
    quality: new FormArray<any>([new FormControl('', [Validators.required])]),
  });
  location: any = new FormControl('', [Validators.required]);
  objectives: any = new FormArray<any>([new FormControl('', [Validators.required])]);
  operation: any = new FormArray<any>([new FormControl('', [Validators.required])]);
  preStatus: any = new FormControl('');
  projectId: any = new FormControl('');
  projectName: any = new FormControl('', [Validators.required]);
  reportSubmissionDeadline: Date = new Date();
  responsibleStudents: any = new FormArray([new FormGroup({
    studentId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  })])
  rowState: RowState = RowState.Unchanged;
  startTime: any = new FormControl(new Date());
  status: string | FormControl<string | null> = new FormControl('');
  strategyId: string | FormControl<string | null> = new FormControl('', [Validators.required]);
  strategicDetail: string | FormControl<string | null> = new FormControl('');
  tsuTalent: any = new FormGroup<any>({
      tsuGlobalTalent: new FormArray<any>([]),
      tsuCommunicationTalent: new FormArray<any>([]),
      tsuSocialInnovationEntrepreneurshipTalent: new FormArray<any>([])
    })
  users: User = new User().users
  userId: string = '0';
  approved: any = new FormControl('');
  createdDate: Date = new Date();
  updatedDate: Date = new Date();
  totalBudget: number = 0;
}
