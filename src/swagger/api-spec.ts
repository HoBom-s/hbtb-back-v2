import userApi from "./user.api";
import tagApi from "./tag.api";
import definitions from "./definitions";
import parameters from "./parameters";

const apiSpec = {
  info: {
    title: "HoBom Tech Blog API Docs",
    version: "2.0.0",
    description: "HBTB-version2 api docs.",
  },
  host: "localhost:3306",
  basePath: "/api/v2",
  swagger: "2.0",
  paths: {
    ...userApi,
    ...tagApi,
  },
  ...definitions,
  ...parameters,
  tags: [
    {
      name: "User",
      description: "Users management (including signup, login, etc.)",
    },
    {
      name: "Tag",
      description: "Tags CRUD",
    },
    {
      name: "Article",
      description: "Articles CRUD (including thumbnail upload)",
    },
    {
      name: "Category",
      description: "Category CRUD",
    },
  ],
};

export default apiSpec;
