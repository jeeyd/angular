import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { VarsService } from 'src/app/services/vars.service';

//Sweet alert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  idToStart = 2
  idEdit = 0

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private vars: VarsService
  ) {
    this.vars.onEdit.subscribe(k => {
      if (k) {
        this.buttons[0].type = 'hidden'
        this.buttons[1].type = 'hidden'
        this.buttons[2].type = ''
        this.buttons[3].type = ''
      } else {
        this.idEdit = 0
        this.buttons[0].type = ''
        this.buttons[1].type = ''
        this.buttons[2].type = 'hidden'
        this.buttons[3].type = 'hidden'
      }
    })
    
    this.vars.contact.subscribe(k => {
      if (this.form) {
        this.idEdit = k.id
        this.form.controls['name'].setValue(k.name)
        this.form.controls['email'].setValue(k.email)
        this.form.controls['phone'].setValue(k.phone.replace(/[^0-9]/g, ''))
      }
    })
  }

  fields = [
    {
      name: 'Name',
      placeholder: 'Full Name',
      type: 'name'
    },
    {
      name: 'Email',
      placeholder: 'Email Address',
      type: 'email'
    },
    {
      name: 'Phone',
      placeholder: 'Contact Number',
      type: 'phone'
    }
  ]

  buttons = [
    {
      name: 'Add',
      type: '',
      color: 'primary',
      required: true
    },
    {
      name: 'Reset',
      type: '',
      color: 'danger',
      required: false
    },
    {
      name: 'Update',
      type: 'hidden',
      color: 'primary',
      required: true
    },
    {
      name: 'Cancel',
      type: 'hidden',
      color: 'secondary',
      required: false
    },
  ]

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        phone: ['', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern("^[0-9]*$")
        ]]
      }
    )
  }

  addContact(id: any) {
    this.api.addContact({
      id: id > 0 ? id : this.idToStart,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value
    }, id > 0 ? true : false)
    id > 0 ? this.idEdit = 0 : this.idToStart++

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your contact has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.form.reset()
  }

  cancel() {
    this.vars.isEdit(false, { phone: '!' })
  }

}
