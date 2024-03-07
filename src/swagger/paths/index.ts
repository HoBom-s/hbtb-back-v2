import userPath from "./user.path";
import tagPath from "./tag.path";
import categoryPath from "./category.path";
import articlePath from "./article.path";

const routerApi = {
  ...userPath,
  ...tagPath,
  ...categoryPath,
  ...articlePath,
};

export default routerApi;
