import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
})
export class AlertComponent {
  @Input() title: string = 'Alert';
  @Input() message: string = '';
  @Input() type: string = 'info';

  constructor() { }

  alert: { [type: string]: { borderColor: string; textColor: string; title: string; iconPath: string } } = {
    'info': { borderColor: 'border-indigo-400', textColor: 'text-indigo-400', title: 'ข้อมูล', iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    'success': { borderColor: 'border-green-500', textColor: 'text-green-500', title: 'สำเร็จ', iconPath: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    'error': { borderColor: 'border-red-500', textColor: 'text-red-500', title: 'ข้อผิดพลาด', iconPath: 'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z' },
    'warn': { borderColor: 'border-yellow-500', textColor: 'text-yellow-500', title: 'คำเตือน', iconPath: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z' }
  };

  get alertClass(): string { return `flex bg-card border-t-4 rounded-b text-muted px-4 py-3 shadow-md w-80 md:w-96 ${this.alert[this.type].borderColor}`; }

  get iconPath(): string { return this.alert[this.type]?.iconPath || ''; }
}
