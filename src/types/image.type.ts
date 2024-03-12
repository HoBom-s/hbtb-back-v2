export type MulterFile = Express.Multer.File;

export type MulterFileArray = Express.Multer.File[];

export type UploadOneImageData = {
  originalname: string;
  buffer: Buffer;
};

export type UploadMultipleImagesData = UploadOneImageData[];
