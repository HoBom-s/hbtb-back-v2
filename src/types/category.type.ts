export interface TCreateCategory {
  title: string;
  path: string;
  spot: string;
}

export interface TCreateCategoryWithIndex {
  title: string;
  path: string;
  spot: string;
  sortIndex: number;
}

export interface TUpdateCategory {
  title?: string;
  path?: string;
  spot?: string;
}

export interface TUpdateCategoryWithId {
  id: string;
  title?: string;
  path?: string;
  spot?: string;
}
