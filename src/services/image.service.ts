import axiosInstance from "../api/image.api";
import { CustomError } from "../middlewares/error.middleware";
import {
  MulterFile,
  MulterFileArray,
  UploadMultipleImagesData,
  UploadOneImageData,
} from "../types/image.type";

export class ImageService {
  constructor() {}

  // WIP
  async uploadOneImage(image: MulterFile): Promise<string> {
    const { originalname, buffer, ...restInfo } = image;
    const imageInfo: UploadOneImageData = { originalname, buffer };
    try {
      const response = await axiosInstance.post("/single", imageInfo);
      return response.data;
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }

  async uploadImages(
    thumbnail: MulterFileArray,
    type: string,
  ): Promise<string> {
    if (type === "create" && !thumbnail.length)
      return process.env.DEFAULT_THUMBNAIL as string;

    const thumbnailInfo: UploadMultipleImagesData = Object.values(thumbnail)
      .flat()
      .map((file) => {
        const { originalname, buffer, ...restInfo } = file;
        return { originalname, buffer };
      });

    try {
      const response = await axiosInstance.post("/images", thumbnailInfo);
      return response.data;
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }
}
