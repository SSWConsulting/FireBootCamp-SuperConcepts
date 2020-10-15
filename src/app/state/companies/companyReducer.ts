import { Company } from 'src/app/company/company';
import { Action } from '@ngrx/store';


export const LOAD_COMPANIES_SUCCESS = 'Companies: LOAD_COMPANIES_SUCCESS';


export function companyReducer(state: Company[], action): any {
  switch (action.type) {
    case LOAD_COMPANIES_SUCCESS:
      return action.payload;
    default:
    return state;
  }
}
