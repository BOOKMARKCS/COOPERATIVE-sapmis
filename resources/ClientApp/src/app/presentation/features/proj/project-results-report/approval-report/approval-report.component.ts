import { Component } from '@angular/core';
import { ProjectResultsReport } from "../../../../../core/domain/entities/proj/projectResultsReport";
import { CommentProjectReport } from "../../../../../core/domain/entities/proj/commentProjectReport";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RowState } from "../../../../../core/domain/stateManagement/rowState";
import { getIndexArray, increasedStatus, ProjService, toNumber } from "../../proj.service";
import { ProjPath } from "../../../../../core/domain/stateManagement/ProjPath";
import { IUser } from "../../../../../core/domain/entities/account/User";
import jwt_decode from "jwt-decode";
import { AccountService } from "../../../account/account.service";
import { ModalComponent } from "../../../../../core/base/components/modals/modal/modal.component";

@Component({
    selector: 'app-approval-report',
    templateUrl: './approval-report.component.html',
})
export class ApprovalReportComponent {
    projectResultsReport: ProjectResultsReport = new ProjectResultsReport();
    commentProjectReport: FormGroup;
    projectResultsReportForm: any = this.fb.group(new ProjectResultsReport());
    rowState: RowState;
    btnCommentReportName: string = 'แสดงความคิดเห็นก่อนส่งกลับ';
    role: string = '';
    toggleBtnApprove: boolean = false;
    protected readonly RowState = RowState;
    protected readonly window = window;
    protected readonly toNumber = toNumber;
    protected readonly ProjectResultsReport = ProjectResultsReport;
    protected readonly getIndexArray = getIndexArray;

    constructor(private fb: FormBuilder, private projService: ProjService, private accountService: AccountService, private modalComponent: ModalComponent) {
        this.projectResultsReport = window.history.state.proj
        this.commentProjectReport = fb.group(new CommentProjectReport())
        this.rowState = RowState.Unchanged;
        this.accountService.user$.subscribe((user: IUser | null) => this.role = (jwt_decode(user!.jwt) as any).role);
        console.log(this.projectResultsReport)
    }

    reject() {

        if (this.rowState === RowState.Added) {
            this.modalComponent.confirm(this.projectResultsReportForm.get('projectReportName').value).then(confirm => {
                console.log("approval", {confirm})
                if (confirm) {
                    this.commentProjectReport.get('projectReportId')?.setValue(this.projectResultsReport.projectReportId)
                    console.log(this.commentProjectReport.value)
                    this.projService.post(ProjPath.CommentProjectReport, this.commentProjectReport.value).subscribe({
                        next: () => {
                            window.alert("ส่งกลับโครงการสำเร็จ")
                            history.replaceState(null, '', window.location.href)
                            window.location.href = ''
                        }, error: () => {
                            window.alert('มีข้อผิดพลาดระหว่างส่งกลับโครงการ')
                            window.location.href = ''
                        }
                    })
                }
            })
        } else {
            this.rowState = RowState.Added;
            this.commentProjectReport.get('rowState')?.setValue(RowState.Added)
            this.btnCommentReportName = 'ส่งกลับเพื่อแก้ไข'
            const element = document.getElementById('commentProjectReport');
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }

    approve = () => {
        this.projectResultsReport.rowState = RowState.Modified;
        this.projectResultsReport.status = increasedStatus(this.role, 1)
        this.projectResultsReport.approved = this.projectResultsReportForm.get('approved').value
        this.projService.post(ProjPath.ProjectReport, this.projectResultsReport).subscribe({
            next: () => {
                window.alert("อนุมัติการรายงานผลสำเร็จ")
                history.replaceState(null, '', window.location.href)
                window.location.href = ''
            }, error: () => {
                window.alert('เกิดข้อผิดพลาดระหว่างการอนุมัติ')
                window.location.href = ''
            }
        })
    }

    save() {
        this.projectResultsReport.rowState = RowState.Modified;
        this.projectResultsReport.status = increasedStatus(this.role, 0)
        this.projService.post(ProjPath.ProjectReport, this.projectResultsReport).subscribe({
            next: () => {
                window.alert("บันทึกการรายงานผลสำเร็จ")
                window.location.href = ''
            }, error: () => {
                window.alert('เกิดข้อผิดพลาดระหว่างการบันทึก')
                window.location.href = ''
            }
        })
    }
}
