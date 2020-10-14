import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesTableComponent {

  constructor() { }

  @Input()
  companies: Company[];

  @Output()
  deleteClicked: EventEmitter<Company> = new EventEmitter<Company>();


  deleteCompany(company: Company): void {
    this.deleteClicked.emit(company);
  }



}

