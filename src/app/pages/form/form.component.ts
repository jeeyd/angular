import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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

    console.log(this.form)
  }

}
