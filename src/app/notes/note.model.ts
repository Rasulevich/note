import { Tag } from "../tags/tag.model";

export interface Note {
  id: number;
  title: string;
  content: string;
  dateTime?: string; 
  tags?: Tag[];
}
