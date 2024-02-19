import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { I18nService } from '../i18n.service';
import { OrganizationService } from './organization.service';

// export class Company {
//   value: string;
//   text: string;
//   isDefault:boolean;
// }

@Injectable({ providedIn: 'root' })
export class CompanyService {
  companySub!: Subscription;
  // companies: Company[] = [];
  // companySubject = new BehaviorSubject<Company>(null);
  // company = this.companySubject.asObservable();

  constructor(
    private org: OrganizationService,
    private http: HttpClient,
    // private i18n: I18nService
  ) {

  }

  // init() {
  //   this.companySub = this.i18n.onLangChanged.pipe(
  //     switchMap((event) => this.http.disableHeader().get<Company[]>('company', { params: { lang: event?.lang } }))
  //   ).subscribe(companies => {
  //     this.companies = companies.length === 0 ? [{ value: '!!!', text: 'Not Assign',isDefault:true }] : companies;
  //     const first =  this.companies.find(c=>c.isDefault) ?? this.companies[0];
  //     if (!this.companySubject.getValue()) this.changeCompany(first);
  //     else {
  //       const company =  this.companies.find(c => c.value == this.companySubject.getValue().value);
  //       this.changeCompany(company);
  //     }

  //   })
  // }

  // changeCompany(company: Company) {
  //   if(this.companySubject.getValue()?.value !== company.value) this.org.changeOrganization(null);
  //   this.companySubject.next(company);
  //   this.org.setOrganizations(company.value);
  // }

  // destroy() {
  //   if (this.companySub) {
  //     this.companySub.unsubscribe();
  //   }
  // }
}
