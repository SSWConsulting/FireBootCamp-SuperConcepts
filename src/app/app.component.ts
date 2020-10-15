import { Component, OnInit } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { CompanyService } from './company/company.service';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private companyService: CompanyService) {
  }

  companyCount$: Observable<number>;
  name = 'Super Concepts';


  ngOnInit(): void {
    this.companyCount$ = this.companyService.getCompanies().pipe(
      filter(x => x != null),
      tap(x => console.log('app component get compaines' + x)),
      map(l => l.length),
      tap(x => console.log('recalculated count to ' + x))
    );
  }




}
