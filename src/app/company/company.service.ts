import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(this.errorHandler),
      tap(x => console.log('GOT COMPANIES', x))
    );
  }



  private errorHandler(error: Error): Observable<Company[]>
  {
    console.error('ERROR CAUGHT BY SERVICE', error);
    return new Observable<Company[]>();
  }

}
