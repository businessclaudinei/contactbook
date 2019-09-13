import { UserUtil } from './../utils/user.util';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get(`${environment.apiUrl}?token=${UserUtil.get().token}`);
  }

  getContact(email: string) {
    return this.http.get(`${environment.apiUrl}/${email}?token=${UserUtil.get().token}`);
  }

  addContact(contact: Contact) {
    return this.http.post(`${environment.apiUrl}?token=${UserUtil.get().token}`, contact);
  }

  removeContact(contact: Contact) {
    return this.http.delete(`${environment.apiUrl}${contact.email}?token=${UserUtil.get().token}`);
  }

  updateContact(contact: Contact) {
    return this.http.put(`${environment.apiUrl}${contact.email}?token=${UserUtil.get().token}`, contact);
  }
}
