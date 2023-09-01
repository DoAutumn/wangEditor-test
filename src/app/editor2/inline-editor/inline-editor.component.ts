import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassicEditorComponent } from '../classic-editor/classic-editor.component';

@Component({
  selector: 't-inline-editor',
  templateUrl: './inline-editor.component.html',
  styleUrls: ['./inline-editor.component.less', '../style/index.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineEditorComponent),
      multi: true
    }
  ]
})
export class InlineEditorComponent extends ClassicEditorComponent { }
