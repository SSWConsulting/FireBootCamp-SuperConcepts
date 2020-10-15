import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {


  companyId: number;
  isNewCompany: boolean;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.isNewCompany =  this.activatedRoute.snapshot.toString().indexOf('new') > -1;

    this.buildForm();

    if (!this.isNewCompany) {
      // todo load existing company
      this.companyId = this.activatedRoute.snapshot.params.id;
      this.companyService.getCompany(this.companyId)
      .subscribe(c => this.companyForm.patchValue(c));
    }

  }

  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['test@test.com']
    });
  }

  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value)
      .subscribe(c => this.router.navigateByUrl('/company/list'));
    } else {
      this.companyService.updateCompany({...this.companyForm.value, id: this.companyId})
      .subscribe(c => this.router.navigateByUrl('/company/list'));
    }
  }



}
