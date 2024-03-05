export type MulterFileArray = Express.Multer.File[];

export type UploadImageBodyData = {
  originalname: string;
  buffer: Buffer;
}[];

export const createArticleFields = [
  { name: "thumbnail" },
  { name: "title" },
  { name: "subtitle" },
  { name: "contents" },
  { name: "userId" },
  { name: "path" },
  { name: "tags" },
];
