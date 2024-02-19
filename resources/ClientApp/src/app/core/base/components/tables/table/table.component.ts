import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RoutePath } from "../../../../domain/stateManagement/routePath";
import { ProjectStatus } from "../../../../domain/stateManagement/projectStatus";
import { increasedStatus, ProjService } from "../../../../../presentation/features/proj/proj.service";
import { RowState } from "../../../../domain/stateManagement/rowState";
import { IProjectResultsReport } from "../../../../domain/entities/proj/projectResultsReport";
import { ProjPath } from "../../../../domain/stateManagement/ProjPath";
import { Router } from "@angular/router";
import { IProject } from "../../../../domain/entities/proj/project";
import { generatePDF } from "../../../services/pdf/pdf.service";
import { ModalService } from "../../modals/modal.service";
import { Role } from "../../../../domain/stateManagement/role";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent  {

  @Input() data: any;
  @Input() columns: any;
  @Input() selectedOperation: string  = '';
  @Input() backGroundContent: string = '';
  @Input() role: Role = Role.StudentClub;
  @ViewChild('project') project?: TemplateRef<any>;
  @ViewChild('projectReport') tableProjectReport?: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container?: ViewContainerRef;
  protected readonly RoutePath = RoutePath;
  protected readonly ProjectStatus = ProjectStatus;
  protected readonly RowState = RowState;
  protected readonly ProjPath = ProjPath;
  protected readonly generatePDF = generatePDF;
  protected readonly increasedStatus = increasedStatus;
  protected readonly toNumber = parseFloat;

  constructor(private projService: ProjService, public route: Router, private modalService:ModalService) {

  }

  updateProject = () => this.projService.get(ProjPath.Project).subscribe(project => this.data = (project as IProject[]))

  updateProjectReport = () => this.projService.get(ProjPath.ProjectReport).subscribe(projectReport => {
    this.data = (projectReport as IProjectResultsReport[])
  })

  deleteProject(project: IProject) {
    project.rowState = RowState.Deleted
    this.modalService.confirm('').then((confirm:any) => {
      if (confirm) {
        this.projService.delete(ProjPath.DeleteProject, project).subscribe({
          next: () => {
            window.alert('ลบข้อมูลสำเร็จ');
            this.updateProject()
          }, error: () => {
          }
        })
      }
    })
  }

  deleteProjectReport(project: IProjectResultsReport) {
    project.rowState = RowState.Deleted
    this.modalService.confirm('').then((confirm:any) => {
      if (confirm) {
        this.projService.delete(ProjPath.DeleteProjectReport, project).subscribe({
          next: () => {
            window.alert('ลบข้อมูลสำเร็จ');
            this.updateProjectReport()
          }, error: () => {
          }
        })
      }
    })
  }

  openModal() {
    this.modalService.open('open'); // เปลี่ยน 'success-modal' เป็น ID ของ ModalComponent ที่คุณต้องการเปิด
  }
}
