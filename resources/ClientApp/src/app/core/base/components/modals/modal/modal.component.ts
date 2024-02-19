import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ConfirmComponent } from "../confirm/confirm.component";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
@Injectable({
  providedIn: 'root'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Output() closed = new EventEmitter<void>();
  opened: boolean = true
  isOpen = true;

  constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  get getConfirm() {
    return this.opened
  }

  ngOnInit() {
  }

  // async confirm() {
  //   if (this.opened) {
  //     const componentRef: ComponentRef<any> = this.getComponent(ConfirmComponent);
  //     const confirmComponent = componentRef.instance;
  //     this.checkModalClosed(componentRef);
  //     this.opened = false;
  //
  //     let confirm;
  //     // รอการยืนยันจาก ConfirmComponent
  //     await new Promise<void>((resolve) => {
  //       confirmComponent.confirmed.subscribe(() => {
  //         // ทำสิ่งที่คุณต้องการทำเมื่อมีการยืนยัน
  //         componentRef.destroy()
  //         confirm = false
  //         resolve();
  //       });
  //     });
  //     return confirm
  //   }
  // }

  async confirm(dataName: string) {
    if (this.opened) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ConfirmComponent);
      const componentRef = componentFactory.create(this.appRef.injector);
      let documents: any = (document.body.appendChild(componentRef.location.nativeElement));
     this.checkModalClosed(componentRef, documents);
      this.opened = false;
      return await this.checkModalConfirmed(componentRef, documents)
    } else {
      return false
    }
  }

   checkModalClosed(componentRef: ComponentRef<any>, documents: any) {
    componentRef.instance.closed.subscribe(() => {
      documents.remove();
      this.opened = true;
    });
  }

  async checkModalConfirmed(componentRef: ComponentRef<any>, documents: any) {
    let confirm = false
    await new Promise<boolean>(async (resolve) => {
      componentRef.instance.confirmed.subscribe((confirmed: any) => {
        documents.remove()
        this.opened = true;
        confirm = confirmed
        resolve(confirmed)
      });
    })
    return confirm
  }


  getComponent(modalComponent: any) {
    // return this.viewContainerRef.createComponent(modalComponent)

  }


  open(message: string) {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    // const componentRef = componentFactory.create(this.appRef.injector);
    // const modalComponent = componentRef.instance;
    // modalComponent.message = message; // กำหนดค่าให้ Input property
    //
    //
    // // Append the component to the body or any other container
    // let documents: any = (document.body.appendChild(componentRef.location.nativeElement));
    // modalComponent.closed.subscribe(() => {
    //     // componentRef.destroy(); // ทำลายคอมโพเนนต์เมื่อปิด Modal
    //     documents.remove()
    // });
    // const componentRef = this.viewContainerRef.createComponent(ModalComponent);
    // // const componentRef = componentFactory.create(this.appRef.injector);
    // const modalComponent = componentRef.instance;
    // modalComponent.message = message; // กำหนดค่าให้ Input property
    //
    //
    // // Append the component to the body or any other container
    // let documents:any = (document.body.appendChild(componentRef.location.nativeElement));
    // // modalComponent.closed.subscribe(() => {
    // //     documents.remove()
    // // });
  }

  close() {
    this.closed.emit();
  }

  ngOnDestroy() {
  }
}

