import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor() { }

  companies: Company[];

  ngOnInit(): void {
    this.companies = this.getCompanies();
  }


  getCompanies(): Company[] {
    return [
      { name: 'company 1', email: 'email 1', phone: 111 },
      { name: 'company 2', email: 'email 2', phone: 222 },
      { name: 'company 3', email: 'email 4', phone: 333 },
    ];
  }


}
