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
    return this.http.get(`${environment.apiUrl}v1/contact`);
  }

  getContact(id: string) {
    return this.http.get(`${environment.apiUrl}v1/contact/${id}`);
  }

  addContact(contact: Contact) {
    return this.http.post(`${environment.apiUrl}v1/contact`, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put(`${environment.apiUrl}v1/contact/${contact.id}`, contact);
  }
}
