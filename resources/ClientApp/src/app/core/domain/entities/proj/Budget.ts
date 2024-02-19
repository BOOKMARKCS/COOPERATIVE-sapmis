import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export interface IBudget {
    budgetCode: number;
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

export class Budget {
    budgets = new FormArray<any>([new FormGroup<any>({
        budgetCode: new FormControl(0,[Validators.required]),
        projectId: new FormControl('',[Validators.required]),
        costDetails: new FormArray<any>([new FormControl('',[Validators.required])]),
        costAmount: new FormArray<any>([new FormControl(0,[Validators.required])]),
        remunerationDetails: new FormArray<any>([new FormControl('',[Validators.required])]),
        remunerationAmount: new FormArray<any>([new FormControl(0,[Validators.required])]),
        equipmentCostDetails: new FormArray<any>([new FormControl('',[Validators.required])]),
        equipmentCostAmount: new FormArray<any>([new FormControl(0,[Validators.required])]),
        otherDetails: new FormArray<any>([new FormControl('',[Validators.required])]),
        otherAmount: new FormArray<any>([new FormControl(0,[Validators.required])]),
    })
    ]);
}

