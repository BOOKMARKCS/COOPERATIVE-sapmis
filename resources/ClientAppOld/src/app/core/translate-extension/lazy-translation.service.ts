import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpService } from '../http/http.service';
import { mergeDeep } from './translate-http-loader';

@Injectable({
    providedIn: 'root'
})

export class LazyTranslationService {

    private lazyLoadedSubject = new BehaviorSubject<string[]>([]);
    lazyLoaded = this.lazyLoadedSubject.asObservable();
    private modules: string[] = [];
    private loadedTranslate : {  [key: string]: {}} = {};
    private loaded = false;

    constructor(private injector: Injector) { }

    get translationLoaded() {
        return this.loaded;
    }

    set translationLoaded(value: boolean) {
        this.loaded = value;
    }

    public add(module: string) {
        // do not add if already added.
        if (this.modules.includes(module)) return;

        this.modules.push(module);
        if (this.loaded) {
            this.load(module);
        }
    }

    loadByLang(lang:any) {
        return this.modules.map(module => {
            return this.retrieve(module, lang);
        });
    }

    getLoadedTranslate(lang:any){
       return this.loadedTranslate[lang] ?? {};
    }

    private load(module: string) {
        const translate = this.injector.get(TranslateService);
        const langs = translate.langs?.length == 0 ? [translate.currentLang] : translate.langs;
        langs.forEach(lang => {
            this.retrieve(module, lang).pipe(
                finalize(() => this.lazyLoadedSubject.next(this.modules))
            ).subscribe(result => {
                this.loadedTranslate[lang] = mergeDeep(this.loadedTranslate[lang] ?? {},result);
                translate.setTranslation(lang, result, true);
            })
        })
    }

    private retrieve(module: string, lang: string): Observable<any> {
        let http = this.injector.get(HttpService);
        return http.skipErrorHandler().disableHeader().get(`localize/${module}/${lang}`).pipe(
            catchError(res => of({}))
        )
    }
}
