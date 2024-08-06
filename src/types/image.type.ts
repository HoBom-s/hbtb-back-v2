export type MulterFile = Express.Multer.File;

export interface InfoOnUploadImage {
  image: MulterFile;
  uniqueString: string;
}

export interface UploadOneImageData {
  uniqueString: string;
  buffer: Buffer;
  path: string;
  ext: string;
}
