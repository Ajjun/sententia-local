import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'Sententia';
}
