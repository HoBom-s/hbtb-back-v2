import Joi from "joi";

class JoiSchemaMaker {
  private target: string;

  constructor(target: string) {
    this.target = target;
  }

  createSchema = () => {
    return Joi.object();
  };
}

class ValidateHelper {
  asJoiSchema = (target: string) => {
    return new JoiSchemaMaker(target).createSchema();
  };
}

export default ValidateHelper;

/*
1. target 받아서 schema return
2. target 관심사 여부에 따라 인스턴스 생성하는 클래스 (extends)
- article, tag, user, category
*/

/*
class ValidateHelper {
  constructor() {}

  idParam = {
    id: Joi.string().required(),
  };

  articleCreate = {
    thumbnail: Joi.string().optional(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    contents: Joi.string().required(),
    userId: Joi.string().required(),
    path: Joi.string().required(),
    tags: Joi.array().items(Joi.string().valid("title", "path").required()),
  };

  articleUpdate = {
    thumbnail: Joi.string().optional(),
    title: Joi.string().optional(),
    subtitle: Joi.string().optional(),
    contents: Joi.string().optional(),
    path: Joi.string().optional(),
  };

  categoryCreate = {
    title: Joi.string().required(),
    path: Joi.string().required(),
    spot: Joi.string().required(),
  };

  categoryUpdate = {
    title: Joi.string().optional(),
    path: Joi.string().optional(),
    spot: Joi.string().optional(),
  };

  tagCreate = {
    title: Joi.string().required(),
    path: Joi.string().required(),
  };

  tagUpdate = {
    title: Joi.string().optional(),
    path: Joi.string().optional(),
  };

  userCreate = {
    nickname: Joi.string().required(),
    password: Joi.string().required(),
    profileImg: Joi.string().optional(),
    introduction: Joi.string().required(),
  };

  userLogin = {
    nickname: Joi.string().required(),
    password: Joi.string().required(),
  };

  userUpdate = {
    nickname: Joi.string().optional(),
    password: Joi.string().optional(),
    profileImg: Joi.string().optional(),
    introduction: Joi.string().optional(),
  };

  asJoiSchema = (target: string) => {
    if (typeof target !== "string")
      throw new CustomError(400, "Validation string type error.");
    const joiSchema = Joi.object(this[target]);
    return joiSchema;
  };
}

export default ValidateHelper;
*/
