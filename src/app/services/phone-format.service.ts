import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneFormatService {

  constructor() { }

  formatPhone(list: any) {
    try {
      list.map((x: { phone: string; }) => {
        let cleaned = ('' + x.phone).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);

        if (match) {
          x.phone = '(' + match[1] + ') ' + match[2] + ' ' + match[3]
        };
      })
    } catch {
      let cleaned = ('' + list.phone).replace(/\D/g, '');
      let match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);

      if (match) {
        list.phone = '(' + match[1] + ') ' + match[2] + ' ' + match[3]
      };
    }

    return list
  }
}
