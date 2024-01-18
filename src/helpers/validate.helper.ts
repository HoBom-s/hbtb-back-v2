import Joi from "joi";

const validateHelper: { [key: string]: object } = {
  tagCreate: {
    title: Joi.string().required(),
    path: Joi.string().required(),
  },

  tagUpdate: {
    title: Joi.string().required(),
    path: Joi.string().required(),
  },

  tagDelete: {
    id: Joi.string().required(),
  },

  idParam: {
    id: Joi.string().required(),
  },
};

export default validateHelper;
