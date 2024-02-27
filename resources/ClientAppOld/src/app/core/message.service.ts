import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private toastr: ToastrService, private translate: TranslateService) {
    }

    translatedParams(params:string[] = []) {
        return forkJoin(params.map(item => this.translate.get(item))).pipe(
            map((params) => this.arrayToObject(params))
        )
    }

    translatedMessage(message:string, params: string[] | null = null) {
        return params != null && params.length > 0 ? this.translatedParams(params).pipe(
            switchMap(translated => this.translate.get(message, translated))
        ) : this.translate.get(message);
    }

    info(message:string, params: string[] | null= null) {
        this.translatedMessage(message, params).subscribe((translated) => this.toastr.info(translated, "Information"));
    }

    success(message:string, params: string[] | null= null) {
        this.translatedMessage(message, params).subscribe((translated) => this.toastr.success(translated, "Success"));
    }

    error(message:string, params: string[] | null= null) {
        this.translatedMessage(message, params).subscribe((translated) => this.toastr.error(translated, "Error",{ timeOut:6000 ,extendedTimeOut:10000}));
    }

    errorConcat(message:string) {
        this.toastr.error(message, "Error",{ enableHtml: true, timeOut:10000 ,extendedTimeOut:60000});
    }

    warning(message:string, params: string[] | null= null) {
        this.translatedMessage(message, params).subscribe((translated) => this.toastr.warning(translated, "Warning",{ timeOut:6000,extendedTimeOut:10000 }));
    }

    private arrayToObject = (array:string[] = []) =>
        array.reduce((obj:any, item, index) => {
            obj[index] = item;
            return obj
        }, {})
}
