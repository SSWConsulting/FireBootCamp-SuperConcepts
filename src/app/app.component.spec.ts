import { AppComponent } from "./app.component";
import { CompanyService } from './company/company.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompaniesTableComponent } from './company/companies-table/companies-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Company } from './company/company';
import { By } from '@angular/platform-browser';

describe(`testing jasmine`, () => {
    it('should add 1+1', () => {
      const v = 1 + 1;
      expect(v).toEqual(2);
    });
});


describe(`AppComponent`, () => {

  let companyService;

  beforeEach(() => {
    companyService = {
      getCompanies: () => of([
        {
          name: 'Fake Company',
          email: 'test@test.com',
          number: 122345
        }
    ])
    };
  });

  it('should have name', () => {
    const component = new AppComponent(null);
    expect(component.name).toEqual('Super Concepts');
  });

  it('should Get companyCount', () => {
    const component = new AppComponent(companyService);
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    });
  });
});



describe('using spyon', () => {

  let companySvc;
  let component;

  beforeEach(() => {
    companySvc = {
      getCompanies: () => {}
    };
    component = new AppComponent(companySvc);
  });


  it('should get 2 companies', () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company',
        email: 'test@test.com',
        number: 122345
      },
      {
        name: 'Fake Company2',
        email: 'test@test.com',
        number: 122345
      },
    ]
    )); // end spyon
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });

});






describe('TestBed', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompaniesTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  });


  it(`companyCount = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        phone: 12345
      }
    ] as Company[] ));

    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }));


  });


  it(`html should display count`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: 'Fake Company C',
        email: 'fakeEmail@ssw.com.au',
        phone: 12345
      }
    ] as Company[] ));

    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;
    expect(el.textContent).toEqual('1');

  });

});

