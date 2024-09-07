import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../notes/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notesSubject = new BehaviorSubject<Note[]>([
    { id: 1, title: 'Note 1', content: 'Content of Note 1', dateTime: '2024-09-05T12:00', tags:[{ id: 1, name: 'Work' }] },
    { id: 2, title: 'Note 2', content: 'Content of Note 2', dateTime: '2024-09-06T15:30', tags:[{ id: 1, name: 'Work' }] },
  ]);
  public notes$ = this.notesSubject.asObservable();

  constructor() { }

  addNote(note: Note): void {
    const notes = this.notesSubject.getValue();
    this.notesSubject.next([...notes, note]);
  }

  updateNote(updatedNote: Note): void {
    this.notesSubject.next(this.notesSubject.value.map(el=> el.id === updatedNote.id ? updatedNote : el));
  }

  deleteNoteById(id: number): void {
    const notes = this.notesSubject.getValue().filter(note => note.id !== id);
    this.notesSubject.next(notes);
  }
}
