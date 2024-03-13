export type MulterFile = Express.Multer.File;

export type MulterFileArray = Express.Multer.File[];

export type UploadOneImageData = {
  originalname: string;
  buffer: Buffer;
  path: string;
};

export type UploadMultipleImagesData = UploadOneImageData[];
