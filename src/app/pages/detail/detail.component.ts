import { Component, OnInit } from '@angular/core';
import { VarsService } from 'src/app/services/vars.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  contact: any

  constructor(
    private vars: VarsService
  ) {
    this.vars.viewContact.subscribe(k => {
      this.contact = k
    })
  }

  ngOnInit(): void {
  }

}
