export enum ProjectType {
  StudentClub = 'StudentClub',
  Club = 'Club',
  OrganizationAndCouncil = 'OrganizationAndCouncil'
}

interface ProjectStatusAction {
  actionName: string;
  route?: string;
  tone: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'card';
}

export interface ProjectStatusItem {
  statusName: string;
  actions: ProjectStatusAction[];
}

export interface ProjectStatusType {
  [key: number]: ProjectStatusItem;
}

export const ProjectStatus: { [key in ProjectType]: ProjectStatusType } = {
  StudentClub: {
    1000: {statusName: 'รอผู้รับผิดชอบแก้ไข', actions: [{actionName: 'แก้ไขข้อมูล', tone: 'card'}]},
    1001: {statusName: 'รอผู้รับผิดชอบส่งคำขอ', actions: [{actionName: 'แก้ไขข้อมูล', route: '/responsible/edit-project', tone: 'card'}]},
    1002: {statusName: 'รอที่ปรึกษาเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1003: {statusName: 'รอโสมรนิสิตเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1004: {statusName: 'รอที่ปรึกษาสโมสรนิสิตเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1005: {statusName: 'รอองค์การนิสิตเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1006: {statusName: 'รอสภานิสิตเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1007: {statusName: 'รอกิจการนิสิตเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1008: {statusName: 'รอสำนักงานคณะเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1009: {statusName: 'รอรองคณบดีเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1010: {statusName: 'รอผู้ช่วยคณบดีเห็นชอบ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]},
    1011: {statusName: 'รอคณบดีอนุมัติ', actions: [{actionName: 'ตรวจสอบ', tone: 'card'}]}
  },
  Club: {},
  OrganizationAndCouncil: {}
};
