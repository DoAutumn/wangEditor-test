import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiEditorModule } from '../editor2/editor.module';
import { InlineEditorComponent } from './inline-editor.component';



@NgModule({
  declarations: [
    InlineEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TuiEditorModule,
    
  ],
  exports: [
    InlineEditorComponent
  ]
})
export class InlineEditorModule { }
