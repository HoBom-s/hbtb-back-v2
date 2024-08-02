import axiosInstance from "../api/image.api";
import { CustomError } from "../middlewares/error/error.middleware";
import { InfoOnUploadImage, UploadOneImageData } from "../types/image.type";

export class ImageService {
  constructor() {}

  async uploadOneImage(info: InfoOnUploadImage, path: string): Promise<string> {
    const { image, uniqueString } = info;

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

  async removeOneImage(imageUrl: string) {
    const imageKey = imageUrl.split("amazonaws.com").pop()?.slice(1);

    try {
      return axiosInstance.post("/images/remove", { imageKey });
    } catch (error) {
      throw new CustomError(500, `${error}`);
    }
  }
}
