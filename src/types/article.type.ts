export type TNewArticleInfo = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  path: string;
  tags: { title: string; path: string };
};

export type TCreateArticle = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tags: [{ title: string; path: string }];
};

export type TCreateArticleWithTagId = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  userId: string;
  path: string;
  tagId: string[];
};
