import { AbstractControl, FormControl } from "@angular/forms";
import { User } from "../account/User";

export interface ICommentProject {
  commentId: FormControl<string | null>;
  commentDate: AbstractControl<Date | null>;
  commentStatus: AbstractControl<string | null>;
  projectId: AbstractControl<string | null>;
  projectName: AbstractControl<string | null>;
  activityGroupName: AbstractControl<string | null>;
  responsibleStudent: AbstractControl<string | null>;
  advisorName: AbstractControl<string | null>;
  tsuTalent: AbstractControl<string | null>;
  strategy: AbstractControl<string | null>;
  background: AbstractControl<string | null>;
  objective: AbstractControl<string | null>;
  activityFormat: AbstractControl<string | null>;
  attendant: AbstractControl<string | null>;
  location: AbstractControl<string | null>;
  startDate: AbstractControl<string | null>;
  endDate: AbstractControl<string | null>;
  operation: AbstractControl<string | null>;
  budget: AbstractControl<string | null>;
  expectedOutcome: AbstractControl<string | null>;
  kpi: AbstractControl<string | null>;
  evaluate: AbstractControl<string | null>;
  agenda: AbstractControl<string | null>;
  userId: AbstractControl<string | null>;
}

export class CommentProject {
  commentId: any = '00000000-0000-0000-0000-000000000000';
  commentDate: Date = new Date();
  commentStatus: boolean = false;
  projectId: string = '';
  projectName: string = '';
  activityGroupName: string = '';
  responsibleStudent: string = '';
  advisorName: string = '';
  tsuTalent: string = '';
  strategy: string = '';
  background: string = '';
  objective: string = '';
  activityFormat: string = '';
  attendant: string = '';
  location: string = '';
  duration : string = '';
  operation: string = '';
  budget: string = '';
  expectedOutcome: string = '';
  kpi: string = '';
  evaluate: string = '';
  agenda: string = '';
  userId: any = '00000000-0000-0000-0000-000000000000';
  user : any = new User().users
}
