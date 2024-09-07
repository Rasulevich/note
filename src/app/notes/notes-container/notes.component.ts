import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { NoteFormComponent } from '../note-form/note-form.component';
import { Note } from '../note.model';
import { NotesService } from '../../services/note.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../tags/tag.model';
import { TagFormComponent } from '../tags-form/tags-form.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgFor, NgIf,AsyncPipe, DatePipe, NoteFormComponent, ReactiveFormsModule, TagFormComponent ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  private notesService = inject(NotesService);
  private tagService = inject(TagService);
  private readonly fb = inject(FormBuilder);

  public tags$: Observable<Tag[]> = this.tagService.tags$;
  selectedTags: Tag[] = [];
  public notes$: Observable<Note[]> = this.notesService.notes$;
  editingNote?: Note;

  public editForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    dateTime: ['']
  });

  public createNote(note: Note) {
    const newNote = {...note, tags:this.selectedTags}
    this.notesService.addNote(newNote)
    this.selectedTags = [];
  }

  public deleteNote(id: number): void {
    this.notesService.deleteNoteById(id);
  }

  public editNote(note: Note): void {
    this.editingNote = note;
    this.editForm.setValue({
      title: note.title,
      content: note.content,
      dateTime: note.dateTime || ''
    });
  }
  
  public updateNote(): void {
    if (this.editingNote) {
      const updatedNote: Note = {
        id: this.editingNote.id,
        title: this.editForm.value.title || '',
        content: this.editForm.value.content || '',
        dateTime: this.editForm.value.dateTime || '',
        tags: this.selectedTags
      };
      this.notesService.updateNote(updatedNote);
      this.editingNote = undefined; 
      this.selectedTags = [];
    }
  }

  public cancelEdit(): void {
    this.editingNote = undefined; 
  }

  public onTagsChanged(tags: Tag[]): void {
    this.selectedTags = tags;
  }
}
