export type TCreateCategory = {
  title: string;
  path: string;
  spot: string;
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
