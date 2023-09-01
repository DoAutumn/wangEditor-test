import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ButtonModule, DialogModule, TableModule, TooltipModule } from '@tui/component-library';
import { TuiEditorModule } from './editor2/editor.module';
import { InlineEditorModule } from './inline-editor/inline-editor.module';
import { DocumentEditorModule } from './document-editor/document-editor.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    TuiEditorModule,
    InlineEditorModule,
    DocumentEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
