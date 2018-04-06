import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Injectable()
export class UserdetailsService {

	public loggedUserEmail = new BehaviorSubject<string>('');
	currentUser = this.loggedUserEmail.asObservable();
	ActiveMail: string;

  constructor(private http: HttpClient) { }

  newUserEmail(newMail:string) {
  	this.loggedUserEmail.next(newMail);
  	this.ActiveMail = newMail;
  }
}
