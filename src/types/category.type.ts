export interface TCreateCategoryWithIndex {
  title: string;
  path: string;
  spot: string;
  sortIndex: number;
}

export interface TUpdateCategoryWithId {
  id: string;
  title?: string;
  path?: string;
  spot?: string;
}
