import { Component, signal } from '@angular/core';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-project-proposer',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './project-proposer.component.html',
  styleUrl: './project-proposer.component.sass'
})
export class ProjectProposerComponent {

  projectProposals = {
    id: 1,
    proposed_by: 1,
    project_titles: ['ชื่อโครงการ'],
    project_details: ['โครงการทดสอบ'],
    status: ['รอที่ปรึกษาโครงการเห็นชอบ'],
    projectFlowStatus: ['รอที่ปรึกษาโครงการ']
  }

  projectApprovals = {
    project_id: 1,
    approved_by_id: [2],
    approved_by_name: ['กนกนันทร์ สุเชาว์อินทร์'],
    approval_comment: ['เห็นควรอนุมัติ'],
    approval_time: [new Date()]
  }

  Flow = ['รอผู้รับผิดชอบโครงการ', 'รอที่ปรึกษาโครงการ', 'รอสโมสรนิสิต', 'รอที่ปรึกษาสโมสรนิสิต', 'รอองค์การนิสิต', 'รอสภานิสิต', 'รอกิจการนิสิต', 'รอสำนักงานคณะ', 'รอรองคณบดี/ผู้ช่วยคณบดีอนุมัติ', 'รอคณบดี']
  projectFlow = {
    id: 1,
    name: 'สโมสรนิสิต',
    flow: ['รอผู้รับผิดชอบโครงการ', 'รอที่ปรึกษาโครงการ', 'รอสโมสรนิสิต', 'รอที่ปรึกษาสโมสรนิสิต', 'รอองค์การนิสิต', 'รอสภานิสิต', 'รอกิจการนิสิต', 'รอสำนักงานคณะ', 'รอรองคณบดี/ผู้ช่วยคณบดีอนุมัติ', 'รอคณบดี']
  }

  next() {
    this.projectFlow.flow[this.projectApprovals.approval_comment.length -1] = this.Flow[this.projectApprovals.approval_comment.length - 1]
    const name = ['จาริยา รัชตาธิวัตน์', 'จารุนันท์ พันธ์งามตา', 'จิตราพร ทองคง', 'เฉลิมเดช ประพิณไพโรจน์', 'ณภัทร เครือทิวา', 'ณัฏฐา สุภาสนันท์', 'ณัฐดา ฟักทอง', 'ทวีภรณ์ ศรีสุขคำ', 'นาตยา ไรมบุตร์', 'ประผล รุจิพร']
    if (this.projectApprovals.approved_by_name.length <= 9) {

      this.projectApprovals.approved_by_name.push(name[this.projectApprovals.approved_by_name.length])
      this.projectApprovals.approval_comment.push('เห็นควรอนุมัติ')
      console.log({projectApproval: this.projectApprovals})
    }
  }

  prev() {
    this.projectFlow.flow[this.projectApprovals.approval_comment.length - 1] = 'รอผู้เสนอแก้ไขโครงการ'
  }
}
