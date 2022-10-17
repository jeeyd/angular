import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  idToStart = 2

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {
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

  addContact() {
    this.api.addContact({
      id: this.idToStart,
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value
    })
    this.idToStart++
    this.form.reset()
  }

}
