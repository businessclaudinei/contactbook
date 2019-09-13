import { ContactCardComponent } from './../../../components/contact-card/contact-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContactListPage } from './contact-list.page';
import { PhoneNumberPipe } from 'src/app/pipes/phoneNumber.pipe';
import { ContactDetailsPage } from '../contact-details/contact-details.page';

const routes: Routes = [
  {
    path: '',
    component: ContactListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactListPage, ContactCardComponent, PhoneNumberPipe, ContactDetailsPage]
})
export class ContactListPageModule { }
