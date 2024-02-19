import { ApplicationRef, ComponentFactoryResolver, Injectable, OnDestroy } from '@angular/core';
import { ModalComponent } from "./modal/modal.component";

export class Alert {
  id: string = '';
  type: AlertType = AlertType.Info;
  message: string = '';
  autoClose: boolean = false;
  keepAfterRouteChange: boolean = false;
  fade: boolean = false;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

@Injectable({
  providedIn: 'root'
})
export class ModalService  implements OnDestroy{
  isOpen = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private modalComponent: ModalComponent) {
  }

  confirm(dataName:string) {
    return this.modalComponent.confirm(dataName)
      // .then(confirm => {
     // console.log("modalService",{confirm})
     //  this.modalComponent.confirm(dataName)
     //  return confirm})

     // return this.modalComponent.confirmed.subscribe(confirm => confirm)
  }

  open(message: string) {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    // const componentRef = componentFactory.create(this.appRef.injector);
    // const modalComponent = componentRef.instance;
    // modalComponent.message = message; // กำหนดค่าให้ Input property
    //
    //
    // // Append the component to the body or any other container
    // let documents:any = (document.body.appendChild(componentRef.location.nativeElement));
    // modalComponent.closed.subscribe(() => {
    //     // componentRef.destroy(); // ทำลายคอมโพเนนต์เมื่อปิด Modal
    //     documents.remove()
    // });
  }

  // confirm(message: string, initialState?: { renderHtml: boolean }, size: Size = Size.Medium) {
  //   const dialogRef = this.dialog.open(ConfirmComponent, { data: { message, initialState }, width: size, position: { top: '20vh' } });
  //   return dialogRef.afterClosed();
  // }

  createComponent() {
    // const componentRef = this.componentFactoryResolver.resolveComponentFactory(ModalComponent).create(this.appRef.injector);
    // const notificationComponent = componentRef.instance;
    // notificationComponent.message = "message";
    // document.body.appendChild(componentRef.location.nativeElement);
  }

  ngOnDestroy(): void {
    console.log("ModalService Destroy")
  }
}
