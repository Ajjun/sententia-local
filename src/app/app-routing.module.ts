import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { IndiregisterComponent } from './indiregister/indiregister.component';
import { FaqComponent } from './faq/faq.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { WebfinalComponent } from './webfinal/webfinal.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { DocuploadComponent } from './docupload/docupload.component';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { SubmitComponent } from './submit/submit.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminProfileComponent } from './admin/admin-profile.component';
import { UserlogstatusComponent } from './userlogstatus/userlogstatus.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SadminGuard } from './sadmin.guard';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';


const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: IndiregisterComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'resetpass', component: ResetpassComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: WebfinalComponent },
  { path: 'profile', canActivate: [AuthGuard], component: UserprofileComponent },
  { path: 'document-upload', canActivate: [AuthGuard], component: DocuploadComponent },
  { path: 'submit', canActivate: [AuthGuard], component: SubmitComponent },
  { path: 'admin', canActivate: [AdminAuthGuard], component: AdminComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin-profile', canActivate: [AdminAuthGuard], component: AdminProfileComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'userlogstatus', component: UserlogstatusComponent },
  { path: 'super-admin', canActivate: [SadminGuard], component: SuperAdminComponent },
  { path: 'my-learning', component: MyLearningComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
