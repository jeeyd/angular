import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contacts: any

  constructor(
    private api: ApiService
  ) { 
    this.api.getContacts.subscribe(k => {
      this.contacts = k
    })
    this.api.addedContact.subscribe(k => {
      this.contacts.push(k)
    })
  }

  ngOnInit(): void {
  }

}
