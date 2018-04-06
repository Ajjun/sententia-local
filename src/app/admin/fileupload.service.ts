import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class fileUploadService {
   private _producturl='/api/bulk_add';
   constructor(private _http: Http){}
   
postFile(fileToUpload: File, email): Observable<any> {
console.log("servicefile", fileToUpload);
console.log("emailinservice", email);	
    const endpoint = '/api/bulk_add';
    const formData: FormData = new FormData();
    formData.append('q8_input', fileToUpload);
    formData.append('email', email);
    return this._http
      .post(endpoint, formData)
      .map((res:any) => { 
      	
      	return res._body; });
}
}