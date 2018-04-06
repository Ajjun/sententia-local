import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Input, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {linegraphdata} from '../linegraphdata';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  selectuserInfo: selectuserinfoData[]= [];
	public loginid :string;
	public selectedUser: string;
	//public selectUserData : any[];

public selectUserApi = "/api/user_details"


foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];


  constructor(private http: HttpClient) { }

  ngOnInit() {

  	this.loginid = localStorage.getItem('loginid');

   let selectUserBody = new URLSearchParams();
       selectUserBody.append('usermail', this.loginid);
   let selectUseroptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
      this.http.post(this.selectUserApi, selectUserBody.toString(), selectUseroptions).subscribe((res:any)=> {

      	console.log("userres", res);


      	for (let i of res) {
      		console.log("iiiii", i);

      		this.selectuserInfo.push(
      			new selectuserinfoData(i.userid, i.name));


		
      	 }
      	 

      	 console.log("selectuserInfo", this.selectuserInfo);


      },
      err => {
         console.log("error occured");
       }
      );

    }

}

export class selectuserinfoData {
	constructor(public userid: string,
				public name: string){}
}




