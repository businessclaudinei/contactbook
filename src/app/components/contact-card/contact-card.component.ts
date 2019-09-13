import { Contact } from 'src/app/models/contact.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() public contact: Contact = new Contact();
  constructor() { }

  ngOnInit() { }

}
