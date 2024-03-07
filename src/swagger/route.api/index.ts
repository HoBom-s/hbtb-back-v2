import userApi from "./user.api";
import tagApi from "./tag.api";
import categoryApi from "./category.api";

const routerApi = {
  ...userApi,
  ...tagApi,
  ...categoryApi,
};

export default routerApi;
