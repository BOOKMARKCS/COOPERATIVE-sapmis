import { FormArray, FormControl, FormGroup } from "@angular/forms";


export class Attendants {
    attendants: any = new FormArray([
        new FormGroup({
            attendantCode: new FormControl(0),
            projectId: new FormControl(''),
            advisorCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            studentCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            teacherCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            // otherCounts: new FormArray([new FormGroup({Male: new FormControl(0), Female: new FormControl(0)})]),
            otherDetails: new FormArray([new FormControl('')]),
        })
    ]);
}


export class ActualParticipants {
    actualParticipants: any = new FormArray([
        new FormGroup({
            attendantCode: new FormControl(0),
            projectReportId: new FormControl(''),
            advisorCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            studentCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            teacherCount: new FormGroup({Male: new FormControl(0), Female: new FormControl(0)}),
            // otherCounts: new FormArray([new FormGroup({Male: new FormControl(0), Female: new FormControl(0)})]),
            otherDetails: new FormArray([new FormControl('')]),
        })
    ]);
}

