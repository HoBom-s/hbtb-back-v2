import userPath from "./user.path";
import tagPath from "./tag.path";
import categoryPath from "./category.path";
import articlePath from "./article.path";
import healthPath from "./health-check.path";

const routerApi = {
  ...userPath,
  ...tagPath,
  ...categoryPath,
  ...articlePath,
  ...healthPath,
};

export default routerApi;
