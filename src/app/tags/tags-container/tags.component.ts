import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Tag } from '../tag.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagService } from '../../services/tag.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  private tagService = inject(TagService);
  private fb = inject(FormBuilder);
  tags$: Observable<Tag[]> = this.tagService.tags$
  editingTag?: Tag;

  public readonly tagForm = this.fb.group({
    name: ['', Validators.required]
  });

  public createTag(): void {
    if (this.tagForm.valid) {
      const newTag: Tag = {
        id:  Date.now(),
        name: this.tagForm.value.name || ''
      };
      this.tagService.addTag(newTag);
      this.tagForm.reset();
    }
  }

  public deleteTag(id: number): void {
    this.tagService.deleteTagById(id);
  }
}
