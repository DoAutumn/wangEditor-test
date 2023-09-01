import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClassicEditorComponent } from '../classic-editor/classic-editor.component';

@Component({
  selector: 't-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.less', '../style/index.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentEditorComponent),
      multi: true
    }
  ]
})
export class DocumentEditorComponent extends ClassicEditorComponent {

  onEditorClick(e: MouseEvent) {
    if ((e.target as any).id === 'editor-container' || (e.target as any).className === 'w-e-scroll') {
      this.editor.blur();
      this.editor.focus(true); // focus 到末尾
    }
  }
}
