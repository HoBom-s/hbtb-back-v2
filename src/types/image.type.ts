export type MulterFileArray = Express.Multer.File[] | undefined;

export type UploadImageBodyData = {
  originalname: string;
  buffer: Buffer;
}[];
