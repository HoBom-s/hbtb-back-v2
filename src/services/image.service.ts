import axiosInstance from "../api/image.api";
import { CustomError } from "../middlewares/error.middleware";
import {
  ArticleInfoOnUploadImage,
  UploadOneImageData,
} from "../types/image.type";

export class ImageService {
  constructor() {}

  async uploadOneImage(
    articleInfo: ArticleInfoOnUploadImage,
    path: string,
  ): Promise<string> {
    const { thumbnail, articlePath } = articleInfo;
    const { buffer, ...restInfo } = thumbnail;
    const imageInfo: UploadOneImageData = { articlePath, buffer, path };
    try {
      const response = await axiosInstance.post("/images/single", imageInfo);
      return response.data;
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }
}
