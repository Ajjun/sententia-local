import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule} from "@angular/material";
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import  { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IndiregisterComponent } from './indiregister/indiregister.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FaqComponent } from './faq/faq.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { WebfinalComponent } from './webfinal/webfinal.component';
import { NgxGaugeModule } from 'ngx-gauge';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { DocuploadComponent } from './docupload/docupload.component';
import { SubmitComponent } from './submit/submit.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { fileUploadService } from './admin/fileupload.service';
import { HttpModule } from '@angular/http';
import { AdminProfileComponent, deleteDialog } from './admin/admin-profile.component';
import { UserlogstatusComponent } from './userlogstatus/userlogstatus.component';
import { SadminGuard } from './sadmin.guard';
import { deleteAdminDialog, SuperAdminComponent } from './super-admin/super-admin.component';
import { UserdetailsService } from './userdetails.service';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { QuillEditorModule } from 'ngx-quill-editor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    FooterComponent,
    IndiregisterComponent,
    FaqComponent,
    ResetpassComponent,
    WebfinalComponent,
    UserprofileComponent,
    DocuploadComponent,
    SubmitComponent,
    AdminComponent,
    AdminProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    deleteDialog,
    UserlogstatusComponent,
    SuperAdminComponent,
    deleteAdminDialog,
    MyLearningComponent,
    PrivacyComponent,
    TermsOfUseComponent
  ],
  imports: [
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    QuillEditorModule,
    Ng2CarouselamosModule,
    NgxChartsModule,
    NgxGaugeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [AuthGuard, AdminAuthGuard, fileUploadService, SadminGuard, UserdetailsService],
  bootstrap: [AppComponent],
  entryComponents: [deleteDialog, deleteAdminDialog]
})

export class AppModule {}
