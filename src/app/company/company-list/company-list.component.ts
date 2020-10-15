import { Component, OnInit, OnDestroy, ViewRef } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Subscription, Observable } from 'rxjs';
import { takeWhile, delay, share } from 'rxjs/operators';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  componentExists = true;

  companies$: Observable<Company[]>;


  constructor(private companyService: CompanyService ) {
  }

  ngOnDestroy(): void {
    this.componentExists = false;
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companies$ = this.companyService.getCompanies();
  }


  deleteCompany(company: Company): void {
    console.log('component caling delete');
    this.companyService.deleteCompany(company);
  }


}
