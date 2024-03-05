export type MulterFileArray = Express.Multer.File[];

export type UploadImageBodyData = {
  originalname: string;
  buffer: Buffer;
}[];
