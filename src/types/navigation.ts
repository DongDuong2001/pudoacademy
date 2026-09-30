export interface NavSubItem {
  id: string;
  title: string;
  slug: string;
  badge?: string;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavSubItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3;
}
