import Joi from "joi";

const bodyValidationHelper: { [key: string]: object } = {
  tagCreate: {
    title: Joi.string().required(),
    path: Joi.string().required(),
  },

  tagUpdate: {
    title: Joi.string().required(),
    path: Joi.string().required(),
  },
};

export default bodyValidationHelper;
