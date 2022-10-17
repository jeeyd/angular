import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { VarsService } from 'src/app/services/vars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contacts: any

  constructor(
    private api: ApiService,
    private vars: VarsService,
    private router: Router
  ) { 
    this.api.getContacts.subscribe(k => {
      this.contacts = k
    })
    this.api.addedContact.subscribe(k => {
      let index = this.contacts.findIndex((object: { id: any }) => {
        return object.id == k.id
      })

      if (index == -1) {
        this.contacts.push(k)
      } else {
        this.contacts[index].name = k.name
        this.contacts[index].email = k.email
        this.contacts[index].phone = k.phone
      }
    })
    this.api.removedContact.subscribe(k => {
      let index = this.contacts.findIndex(( object: { id: any }) => {
        return object.id == k.id
      })

      this.contacts.splice(index, 1)
    })
  }

  viewContact(contact: any) {
    this.vars.view(contact)
    this.router.navigate(['/detail'])
  }

  editContact(contact: any) {
    this.vars.isEdit(true, contact)
  }

  deleteContact(contact: any) {
    this.api.delete(contact)
  }

  ngOnInit(): void {
  }

}
