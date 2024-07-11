export enum ProjectType {
  StudentClub = 'StudentClub',
  Club = 'Club',
  OrganizationAndCouncil = 'OrganizationAndCouncil'
}

interface ProjectStatusAction {
  actionName: string;
  route: string;
  tone: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'card';
  icon: string;
}

export interface ProjectStatusItem {
  statusName: string;
  proposerActions: ProjectStatusAction[];
  officerActions: ProjectStatusAction[];
}

export interface ProjectStatusType {
  [key: number]: ProjectStatusItem;
}

export const ProjectStatus: { [key in ProjectType]: ProjectStatusType } = {
    [ProjectType.StudentClub]: {
      1000: {
        statusName: 'รอผู้รับผิดชอบแก้ไข',
        proposerActions: [{actionName: 'แก้ไขข้อมูล', route: '/responsible/projects/edit', tone: 'card', icon: 'assets/icons/google-font-icons/outline/edit-document.svg'}],
        officerActions: [{actionName: 'ข้อมูลโครงการ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1001: {
        statusName: 'รอผู้รับผิดชอบส่งคำขอ',
        proposerActions: [{actionName: 'แก้ไขข้อมูล', route: '/responsible/projects/edit', tone: 'card', icon: 'assets/icons/google-font-icons/outline/edit-document.svg'}],
        officerActions: [{actionName: 'ข้อมูลโครงการ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1002: {
        statusName: 'รอที่ปรึกษาเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1003: {
        statusName: 'รอโสมรนิสิตเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1004: {
        statusName: 'รอที่ปรึกษาสโมสรนิสิตเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1005: {
        statusName: 'รอองค์การนิสิตเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1006: {
        statusName: 'รอสภานิสิตเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1007: {
        statusName: 'รอกิจการนิสิตเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1008: {
        statusName: 'รอสำนักงานคณะเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1009: {
        statusName: 'รอรองคณบดีเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1010: {
        statusName: 'รอผู้ช่วยคณบดีเห็นชอบ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      },
      1011: {
        statusName: 'รอคณบดีอนุมัติ',
        proposerActions: [{actionName: 'ตรวจสอบ', route: '/responsible/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}],
        officerActions: [{actionName: 'ตรวจสอบ', route: '/endorser/projects/detail', tone: 'card', icon: 'assets/icons/heroicons/outline/document-magnifying-glass.svg'}]
      }
    },
    [ProjectType.Club]:
      {
        // Add statuses for Club
      }
    ,
    [ProjectType.OrganizationAndCouncil]:
      {
        // Add statuses for OrganizationAndCouncil
      }
  }
;
