import { Contact } from '../models/contact.model';

export class ContactUtil {
    static get(): Contact {
        const contact = localStorage.getItem('contactbook.selectedContact');
        if (!contact) return null;
        return JSON.parse(contact);
    }
    static set(contact: Contact): any {
        localStorage.setItem('contactbook.selectedContact', JSON.stringify(contact));
    }
    static clear() {
        localStorage.removeItem('contactbook.selectedContact');
    }
}