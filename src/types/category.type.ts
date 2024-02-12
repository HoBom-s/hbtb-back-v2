export type TCreateCategory = {
  title: string;
  path: string;
  spot: string;
};

export type TCreateCategoryWithIndex = {
  title: string;
  path: string;
  spot: string;
  sortIndex: number;
};

export type TUpdateCategory = {
  title?: string;
  path?: string;
  spot?: string;
};

export type TUpdateCategoryWithId = {
  id: string;
  title?: string;
  path?: string;
  spot?: string;
};
