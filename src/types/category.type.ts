export interface CreateCategory {
  title: string;
  path: string;
  spot: string;
}

export interface CreateCategoryWithIndex {
  title: string;
  path: string;
  spot: string;
  sortIndex: number;
}

export interface UpdateCategory {
  title?: string;
  path?: string;
  spot?: string;
}

export interface UpdateCategoryWithId {
  id: string;
  title?: string;
  path?: string;
  spot?: string;
}
