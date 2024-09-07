import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'notes', loadComponent: () => import('./notes/notes-container/notes.component').then(c => c.NotesComponent) },
    { path: 'reminders', loadComponent: () => import('./reminders/reminders-container/reminders.component').then(c => c.RemindersComponent) },
    { path: 'tags', loadComponent: () => import('./tags/tags-container/tags.component').then(c => c.TagsComponent) },
    { path: '', redirectTo: '/notes', pathMatch: 'full' }
];
