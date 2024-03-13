import axiosInstance from "../api/image.api";
import { CustomError } from "../middlewares/error.middleware";
import { MulterFile, UploadOneImageData } from "../types/image.type";

export class ImageService {
  constructor() {}

  async uploadOneImage(image: MulterFile, path: string): Promise<string> {
    const { originalname, buffer, ...restInfo } = image;
    const imageInfo: UploadOneImageData = { originalname, buffer, path };
    try {
      const response = await axiosInstance.post("/images/single", imageInfo);
      return response.data;
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }
}
