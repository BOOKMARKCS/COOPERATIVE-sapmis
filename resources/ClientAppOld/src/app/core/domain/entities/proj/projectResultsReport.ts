import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RowState } from "../../stateManagement/rowState";
import { ActualParticipants, Attendants } from "../../../../data/proj/project.model";
import { IUser, User } from "../account/User";
import { Budget } from "./Budget";
import { BudgetReport } from "./BudgetReport";

export interface IProjectResultsReport {
    achievingObjectives: [{
        projectObjectives: string;
        objectiveAchievementLevel: string;
    }];
    activityGroupName: string;
    actualParticipants: [
        {
            attendantCode: number;
            projectReportId: string;
            advisorCount: { Male: number, Female: number };
            studentCount: { Male: number, Female: number };
            teacherCount: { Male: number, Female: number };
            otherCounts: [{ Male: number, Female: number }];
            otherDetails: string[];
        }
    ];
    advisorNames: [{
        name: string;
        phoneNumber: string
    }];
    attendantCode: number;
    attendants: [
        {
            attendantCode: number
            projectId: string;
            advisorCount: { Male: number, Female: number };
            studentCount: { Male: number, Female: number };
            teacherCount: { Male: number, Female: number };
            otherCounts: [{ Male: number, Female: number }];
            otherDetails: string[];
        }
    ];
    budgetCode: number;
    budgets: [{
        budgetCode: number;
        projectReportId: string;
        costDetails: string[];
        costAmount: number[];
        remunerationDetails: string[];
        remunerationAmount: number[];
        equipmentCostDetails: string[];
        equipmentCostAmount: number[]
        otherDetails: string[]
        otherAmount: number[]
    }
    ];
    budgetsProjects: [{
        budgetCode: number
        projectId: string;
        costDetails: string[];
        costAmount: number[];
        remunerationDetails: string[];
        remunerationAmount: number[];
        equipmentCostDetails: string[];
        equipmentCostAmount: number[];
        otherDetails: string[];
        otherAmount: number[];
    }
    ]
    endTime: Date;
    kpiGoals: {
        quantity: string[];
        quality: string[];
    }
    kpi: {
        quantity: string[]
        quality: string[]
    }
    location: string;
    problems: string[];
    projectId: string;
    projectReportId: string;
    projectReportName: string;
    report: [{
        imageUrl: string;
    }]
    responsibleStudents: [{
        studentId: string;
        name: string;
        phoneNumber: string;
    }]
    results: string[];
    rowState: RowState;
    startTime: Date;
    status: string;
    suggestions: string[];
    userId: string;
    users: IUser;
    totalBudget: number;
    totalBudgetProject:number;

}

export class ProjectResultsReport {
    achievingObjectives: any = new FormArray([new FormGroup({
        projectObjectives: new FormControl(''),
        objectiveAchievementLevel: new FormControl('')
    })]);
    activityGroupName: FormControl<string | null> = new FormControl('');
    actualParticipants: any = new ActualParticipants().actualParticipants
    advisorNames: any = new FormArray([new FormGroup({
        name: new FormControl(''),
        phoneNumber: new FormControl('')
    })]);
    attendantCode: FormControl<number | null> = new FormControl(0)
    attendants: any = new Attendants().attendants;
    budgetCode: number = 0;
    budgets: any = new BudgetReport().budgetReport;
    budgetsProjects: any = new Budget().budgets;
    endTime: Date = new Date();
    kpiGoals: any = new FormGroup({
        quantity: new FormArray<any>([new FormControl('')]),
        quality: new FormArray<any>([new FormControl('')]),
    });
    kpi: any = new FormGroup({
        quantity: new FormArray<any>([new FormControl('')]),
        quality: new FormArray<any>([new FormControl('')]),
    });
    location: FormControl<string | null> = new FormControl('');
    problems: any = new FormArray([new FormControl('')]);
    projectId: FormControl<string | null> = new FormControl();
    projectReportId: string = '';
    projectReportName: FormControl<string | null> = new FormControl('')
    report: any = new FormArray([new FormGroup({
        imageUrl: new FormControl('')
    })]);
    responsibleStudents: any = new FormArray([new FormGroup({
        studentId: new FormControl(''),
        name: new FormControl(''),
        phoneNumber: new FormControl('')
    })])
    results: any = new FormArray([new FormControl('')]);
    rowState: RowState = RowState.Unchanged;
    startTime: Date = new Date();
    status: any = new FormControl('');
    suggestions: any = new FormArray([new FormControl('')]);
    userId: FormControl<string | null> = new FormControl('');
    users: any = new User().users;
    approved: any = new FormControl('',[Validators.required]);
    totalBudget:any = 0;
  totalBudgetProject:any = 0;
}
