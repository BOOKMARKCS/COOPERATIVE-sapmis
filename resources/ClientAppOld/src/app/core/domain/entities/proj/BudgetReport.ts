import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IBudgetReport {
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

export class BudgetReport {
    budgetReport = new FormArray<any>([new FormGroup<any>({
        budgetCode: new FormControl(0),
        projectReportId: new FormControl(''),
        costDetails: new FormArray<any>([new FormControl('')]),
        costAmount: new FormArray<any>([new FormControl(0)]),
        remunerationDetails: new FormArray<any>([new FormControl('')]),
        remunerationAmount: new FormArray<any>([new FormControl(0)]),
        equipmentCostDetails: new FormArray<any>([new FormControl('')]),
        equipmentCostAmount: new FormArray<any>([new FormControl(0)]),
        otherDetails: new FormArray<any>([new FormControl('')]),
        otherAmount: new FormArray<any>([new FormControl(0)]),
    })
    ]);
}
