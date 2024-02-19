import { Injectable } from "@angular/core";
// import { I18nService } from "../i18n.service";

// export class Organization {
//     value: string;
//     text: string;
// }
//
const ELEMENT_DATA: any[] = [
    { value: 'RX001', text: 'Hydrogen',parent:'001' },
    { value: 'RX002', text: 'Helium',parent:'001' },
    { value: 'RX003', text: 'Lithium',parent:'SS' },
];

@Injectable({ providedIn: 'root' })
export class OrganizationService {
    // organizationsSub!: Subject<string>;
    // organizations!: Organization[];
    // organizationSubject = new BehaviorSubject<Organization>(null);
    // organization = this.organizationSubject.asObservable();
    //
    // constructor(
    //     private http: HttpClient,
    //     private i18n: I18nService,
    // ) {
    //
    //     this.organizationsSub = new Subject<string>();
    //
    //     this.organizationsSub.pipe(
    //         switchMap(com => this.http.disableHeader().get<Organization[]>('company/organization', { params: { companyCode:com, lang: i18n.language } })),
    //     ).subscribe(org => {
    //         this.organizations = org;
    //         if (this.organizations && this.organizations.length) {
    //             const first = this.organizations[0];
    //             if (!this.organizationSubject.getValue()) this.organizationSubject.next(first);
    //             else {
    //                 const organization = this.organizations.find(o => o.value === this.organizationSubject.getValue().value);
    //                 this.organizationSubject.next(organization);
    //             }
    //         }
    //         else this.organizationSubject.next({ value:'!!!',text:'-'} as Organization)
    //     })
    // }


    // setOrganizations(companyCode: string) {
    //     this.organizationsSub.next(companyCode);
    // }

    // changeOrganization(organization: Organization) {
    //     this.organizationSubject.next(organization);
    // }
}
