import routerApi from "./paths";
import definitions from "./config/definitions";
import parameters from "./config/parameters";
import { config } from "dotenv";

config();

const apiSpec = {
  info: {
    title: "HoBom Tech Blog API Docs",
    version: "2.0.0",
    description: "HBTB-version2 api docs.",
  },
  host: `localhost:${process.env.DB_PORT}`,
  basePath: "/api/v2",
  swagger: "2.0",
  paths: {
    ...routerApi,
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
    {
      name: "Health-check",
      description: "Health-checking",
    },
  ],
};

export default apiSpec;
