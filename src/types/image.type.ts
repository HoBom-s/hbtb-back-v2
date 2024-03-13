export type MulterFile = Express.Multer.File;

export type MulterFileArray = Express.Multer.File[];

export interface ArticleInfoOnUploadImage {
  thumbnail: MulterFile;
  articlePath: string;
}

export interface UploadOneImageData {
  articlePath: string;
  buffer: Buffer;
  path: string;
}

export type UploadMultipleImagesData = UploadOneImageData[];
