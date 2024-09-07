import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Reminder } from '../reminder.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReminderService } from '../../services/reminder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [NgFor, NgIf,AsyncPipe, DatePipe, ReactiveFormsModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss'
})
export class RemindersComponent {
  private reminderService = inject(ReminderService);
  private readonly fb = inject(FormBuilder);
  public reminders$: Observable<Reminder[]> = this.reminderService.reminders$;

  public reminderForm = this.fb.group({
    title: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  public createReminder(): void {
    if (this.reminderForm.valid) {
      const newReminder: Reminder = {
        id: Date.now(), 
        title: this.reminderForm.value.title || '',
        dueDate: this.reminderForm.value.dueDate || ''
      };
      this.reminderService.addReminder(newReminder);
      this.reminderForm.reset();
    }
  }
}