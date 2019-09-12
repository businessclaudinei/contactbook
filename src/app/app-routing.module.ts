import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MasterPage } from './pages/master/master.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  {
    path: '',
    component: MasterPage,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'home',
        loadChildren: () => import('./pages/contact/contact-list/contact-list.module').then(m => m.ContactListPageModule)
      },
      {
        path: 'contact/:contact',
        loadChildren: () => import('./pages/contact/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule)
      },
      {
        path: 'editor/:contact',
        loadChildren: () => import('./pages/contact/edit-contact/edit-contact.module').then(m => m.EditContactPageModule)
      }
    ]
  }
];

//{ path: 'edit-contact', loadChildren: () => import('./pages/contact/edit-contact/edit-contact.module').then(m => m.HomePageModule) },


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
