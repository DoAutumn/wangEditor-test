import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicEditorComponent } from './classic-editor/classic-editor.component';
import { InlineEditorComponent } from './inline-editor/inline-editor.component';
import { DocumentEditorComponent } from './document-editor/document-editor.component';



@NgModule({
  declarations: [
    ClassicEditorComponent,
    InlineEditorComponent,
    DocumentEditorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ClassicEditorComponent,
    InlineEditorComponent,
    DocumentEditorComponent
  ]
})
export class TuiEditorModule { }
