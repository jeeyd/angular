import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PhoneFormatService } from './phone-format.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  contacts: Subject<any> = new BehaviorSubject<any>([])
  toBeAdded: Subject<any> = new BehaviorSubject<any>({})

  constructor(
    private http: HttpClient,
    private format: PhoneFormatService
  ) {
  }

  get getContacts() {
    this.http.get('https://my-json-server.typicode.com/jeeyd/angular/list').subscribe(k => {
      let list: any = k
      this.contacts.next(this.format.formatPhone(list))
    })
    return this.contacts
  }

  addContact(contact: any) {
    this.http.post('https://my-json-server.typicode.com/jeeyd/angular/list', contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(k => {
      this.toBeAdded.next(this.format.formatPhone(k))
    })
  }

  get addedContact() {
    return this.toBeAdded
  }
}
