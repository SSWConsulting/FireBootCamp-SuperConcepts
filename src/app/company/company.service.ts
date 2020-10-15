import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../state/appState';
import { LOAD_COMPANIES_SUCCESS } from '../state/companies/companyReducer';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(
    private httpClient: HttpClient,
    // private store: Store<AppState>,
  ) {

    this.loadCompanies();
  }

  companies$ = new BehaviorSubject<Company[]> ([]);

  loadCompanies(): void {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.errorHandler),
      tap(x => console.log('GOT COMPANIES', x))
    )
    .subscribe(c => this.companies$.next(c));
    // .subscribe(c => this.store.dispatch({type: LOAD_COMPANIES_SUCCESS, payload: c}));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$.asObservable();
    // eturn this.store.select(s => s.companies);
  }


  deleteCompany(company: Company): void {
    console.log('service calling delete');
    this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
    .subscribe(d => this.loadCompanies());
  }

  addCompany(company: Company): void{
    this.httpClient.post<Company>(
      `${this.API_BASE}/company`, company, { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(this.errorHandler))
    .subscribe(a => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(catchError(this.errorHandler));
  }

  updateCompany(company: Company): void {
    this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`,
      company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(this.errorHandler))
    .subscribe(c => this.loadCompanies());
  }

  private errorHandler(error: Error): Observable<any>
  {
    console.error('ERROR CAUGHT BY SERVICE', error);
    return of({});
  }




}
