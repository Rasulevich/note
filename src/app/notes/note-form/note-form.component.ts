import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Note } from '../note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule ],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent {
  noteForm: FormGroup;
  @Output() noteCreated = new EventEmitter<Note>();

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      dateTime: [''],
    });
  }

  createNote(): void {
    if (this.noteForm.valid) {
      const id = Date.now()
      const { title, content, dateTime } = this.noteForm.value;
      this.noteCreated.emit({ title, content, id, dateTime });
      this.noteForm.reset();
    }
  }
}
