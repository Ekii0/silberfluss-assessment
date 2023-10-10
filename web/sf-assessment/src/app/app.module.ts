import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message/message.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatSelectModule } from '@angular/material/select';
import { SignaturePadModule } from 'angular-signature-pad-v2';
import { SignatureFieldComponent } from './signature-field/signature-field.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    SignatureFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    PerfectScrollbarModule,
    SignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
