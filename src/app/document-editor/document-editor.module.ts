import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiEditorModule } from '../editor2/editor.module';
import { DocumentEditorComponent } from './document-editor.component';



@NgModule({
  declarations: [
    DocumentEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiEditorModule
  ],
  exports: [
    DocumentEditorComponent
  ]
})
export class DocumentEditorModule { }
