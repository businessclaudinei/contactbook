import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Result } from 'src/app/models/result.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {

  public contact: Contact;

  constructor(private service: ContactService, private router: ActivatedRoute) { }

  ngOnInit() {
    let email = this.router.snapshot.paramMap.get('contact');
    if (email) {
      this.service.getContact(email).subscribe((res: Result) => {
        this.contact = res.data;
      }, (err) => { });
    }
  }

}
