import userApi from "./user.api";
import tagApi from "./tag.api";
import categoryApi from "./category.api";
import articleApi from "./article.api";

const routerApi = {
  ...userApi,
  ...tagApi,
  ...categoryApi,
  ...articleApi,
};

export default routerApi;
