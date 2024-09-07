import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from '../reminders/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private remindersSubject = new BehaviorSubject<Reminder[]>([
    { id: 1, title: 'Reminder 1', dueDate: '2024-09-10T10:00' },
    { id: 2, title: 'Reminder 2', dueDate: '2024-09-12T14:00' },
  ]);

  public reminders$ = this.remindersSubject.asObservable();

  public addReminder(reminder: Reminder): void {
    const reminders = this.remindersSubject.getValue();
    this.remindersSubject.next([...reminders, reminder]);
  }
}
