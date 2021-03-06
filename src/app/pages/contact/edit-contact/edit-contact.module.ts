import { MaskDirective } from './../../../directives/mask.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditContactPage } from './edit-contact.page';

const routes: Routes = [
  {
    path: '',
    component: EditContactPage
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
  declarations: [EditContactPage, MaskDirective]
})
export class EditContactPageModule { }
