import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuperAdminFunctions {

constructor(private http: HttpClient) { }

public callAPI(api, param, value): Observable<any> {
	let SingleParaBody = new URLSearchParams();
    SingleParaBody.append(param, value);
    let SingleParaOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
    return this.http.post(api, SingleParaBody.toString(), SingleParaOptions).map((res:any)=> {
      return JSON.stringify(res);
    });
}

public MultiAPI(api, param1, value1, param2, value2, param3, value3): Observable<any> {
	let MultiParaBody = new URLSearchParams();
    MultiParaBody.append(param1, value1);
    MultiParaBody.append(param2, value2);
    MultiParaBody.append(param3, value3);
    let MultiParaOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}; 
    return this.http.post(api, MultiParaBody.toString(), MultiParaOptions).map((res:any)=> {
      return JSON.stringify(res);
    });
}
}