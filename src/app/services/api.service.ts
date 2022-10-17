import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PhoneFormatService } from './phone-format.service';
import { VarsService } from './vars.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  contacts: Subject<any> = new BehaviorSubject<any>([])
  toBeAdded: Subject<any> = new BehaviorSubject<any>({})
  toBeRemoved: Subject<any> = new BehaviorSubject<any>({})

  constructor(
    private http: HttpClient,
    private format: PhoneFormatService,
    private vars: VarsService
  ) {
  }

  get getContacts() {
    this.http.get('https://my-json-server.typicode.com/jeeyd/angular/list').subscribe(k => {
      let list: any = k
      this.contacts.next(this.format.formatPhone(list))
    })
    return this.contacts
  }

  addContact(contact: any, edit: boolean) {
    if (edit) {
      return this.http.put(`https://my-json-server.typicode.com/jeeyd/angular/list/${contact.id}`, contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(k => {
        this.toBeAdded.next(this.format.formatPhone(k))
        this.vars.isEdit(false, { phone: '!' })
      }, error => {
        this.toBeAdded.next(this.format.formatPhone(contact))
        this.vars.isEdit(false, { phone: '!' })
      })
    } else {
      return this.http.post('https://my-json-server.typicode.com/jeeyd/angular/list', contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(k => {
        this.toBeAdded.next(this.format.formatPhone(k))
      })
    }
  }

  delete(contact: any) {
    this.http.delete(`https://my-json-server.typicode.com/jeeyd/angular/list/${contact.id}`).subscribe(k => {
      this.toBeRemoved.next(this.format.formatPhone(contact))
    }, error => {
      this.toBeRemoved.next(this.format.formatPhone(contact))
    })
  }

  get addedContact() {
    return this.toBeAdded
  }

  get removedContact() {
    return this.toBeRemoved
  }
}
