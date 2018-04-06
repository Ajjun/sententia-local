import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {
  newpasswdFormControl = new FormControl('', [
    Validators.required,
  ]);
  conpasswdFormControl = new FormControl('', [
    Validators.required,
  ]);
  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }

}
