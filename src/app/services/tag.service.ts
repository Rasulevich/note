import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../tags/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private tagsSubject = new BehaviorSubject<Tag[]>([
    { id: 1, name: 'Work' },
    { id: 2, name: 'Read' },
    { id: 3, name: 'Home' }
  ]);

  public tags$ = this.tagsSubject.asObservable();

  public addTag(tag: Tag): void {
    const tags = this.tagsSubject.getValue();
    this.tagsSubject.next([...tags, tag]);
  }

  public deleteTagById(id: number): void {
    const tags = this.tagsSubject.getValue();
    this.tagsSubject.next(tags.filter(tag => tag.id !== id));
  }
}
