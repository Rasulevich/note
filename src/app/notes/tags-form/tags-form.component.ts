import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TagService } from '../../services/tag.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Tag } from '../../tags/tag.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags-form',
  standalone: true,
  imports: [NgFor, AsyncPipe, ReactiveFormsModule],
  templateUrl: './tags-form.component.html',
  styleUrl: './tags-form.component.scss'
})
export class TagFormComponent {
  @Input() selectedTags?: Tag[] = [];
  @Output() tagsChanged = new EventEmitter<Tag[]>();
  private tagService = inject(TagService);
  tags$: Observable<Tag[]> = this.tagService.tags$;
  selectedTag = new FormControl<Tag | null>(null);

  addTag(): void {
    const tag = this.selectedTag.value;
    if (tag && !this.selectedTags?.find(t => t.id === tag.id)) {
      this.selectedTags?.push(tag);
      this.tagsChanged.emit(this.selectedTags);
      this.selectedTag.setValue(null);
    }
  }

  removeTag(tag: Tag): void {
    this.selectedTags = this.selectedTags?.filter(t => t.id !== tag.id);
    this.tagsChanged.emit(this.selectedTags);
  }
}
