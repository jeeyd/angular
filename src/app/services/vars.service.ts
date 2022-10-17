import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VarsService {

  contact: Subject<any> = new BehaviorSubject<any>('')
  isEditting: Subject<Boolean> = new BehaviorSubject<Boolean>(false)
  viewing: Subject<any> = new BehaviorSubject<any>('')

  get onEdit() {
    return this.isEditting
  }

  get viewContact() {
    return this.viewing
  }

  isEdit(edit: any, contact: any) {
    this.isEditting.next(edit)
    this.contact.next(contact)
  }

  view(contact: any) {
    this.viewing.next(contact)
  }
}
