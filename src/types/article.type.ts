export type TCreateArticle = {
  thumbnail?: string;
  title: string;
  subtitle: string;
  contents: string;
  tags: string[];
  writers: string[];
  path: string;
};
