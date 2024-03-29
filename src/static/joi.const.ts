import Joi from "joi";

const idParam = {
  id: Joi.string().required(),
};

const pathParam = {
  path: Joi.string().required(),
};

const articleCreate = {
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  contents: Joi.string().required(),
  path: Joi.string().required(),
  tags: Joi.string().required(),
};

const articleUpdate = {
  title: Joi.string().optional(),
  subtitle: Joi.string().optional(),
  contents: Joi.string().optional(),
  path: Joi.string().optional(),
};

const categoryCreate = {
  title: Joi.string().required(),
  path: Joi.string().required(),
  spot: Joi.string().required(),
};

const categoryUpdate = {
  title: Joi.string().optional(),
  path: Joi.string().optional(),
  spot: Joi.string().optional(),
};

const tagCreate = {
  title: Joi.string().required(),
  path: Joi.string().required(),
};

const tagUpdate = {
  title: Joi.string().optional(),
  path: Joi.string().optional(),
};

const userCreate = {
  nickname: Joi.string().required(),
  password: Joi.string().optional(),
  introduction: Joi.string().required(),
};

const userLogin = {
  nickname: Joi.string().required(),
  password: Joi.string().required(),
};

const userUpdate = {
  nickname: Joi.string().optional(),
  password: Joi.string().optional(),
  profileImg: Joi.string().optional(),
  introduction: Joi.string().optional(),
};

export {
  idParam,
  pathParam,
  articleCreate,
  articleUpdate,
  categoryCreate,
  categoryUpdate,
  tagCreate,
  tagUpdate,
  userCreate,
  userLogin,
  userUpdate,
};
