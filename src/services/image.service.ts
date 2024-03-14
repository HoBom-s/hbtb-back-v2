import axiosInstance from "../api/image.api";
import { CustomError } from "../middlewares/error.middleware";
import { InfoOnUploadImage, UploadOneImageData } from "../types/image.type";

export class ImageService {
  constructor() {}

  async uploadOneImage(
    articleInfo: InfoOnUploadImage,
    path: string,
  ): Promise<string> {
    const { image, uniqueString } = articleInfo;

    const ext = image.originalname.split(".").pop() as string;

    const { buffer, ...restInfo } = image;

    const imageInfo: UploadOneImageData = { uniqueString, buffer, path, ext };
    try {
      const response = await axiosInstance.post("/images/single", imageInfo);
      return response.data;
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }
}
