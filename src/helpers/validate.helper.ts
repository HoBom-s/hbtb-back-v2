import Joi from "joi";
import { ValidateSchema } from "../types/common.type";
import {
  ID_PARAM,
  ARTICLE_CREATE,
  ARTICLE_UPDATE,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  TAG_CREATE,
  TAG_UPDATE,
  USER_CREATE,
  USER_LOGIN,
  USER_UPDATE,
} from "../static/validate.const";
import {
  idParam,
  articleCreate,
  articleUpdate,
  categoryCreate,
  categoryUpdate,
  tagCreate,
  tagUpdate,
  userCreate,
  userLogin,
  userUpdate,
} from "../static/joi.const";

class JoiSchemaMaker {
  private schema: ValidateSchema;

  createSchema(target: string) {
    switch (target) {
      case ID_PARAM:
        this.schema = idParam;
        break;
      case ARTICLE_CREATE:
        this.schema = articleCreate;
        break;
      case ARTICLE_UPDATE:
        this.schema = articleUpdate;
        break;
      case CATEGORY_CREATE:
        this.schema = categoryCreate;
        break;
      case CATEGORY_UPDATE:
        this.schema = categoryUpdate;
        break;
      case TAG_CREATE:
        this.schema = tagCreate;
        break;
      case TAG_UPDATE:
        this.schema = tagUpdate;
        break;
      case USER_CREATE:
        this.schema = userCreate;
        break;
      case USER_LOGIN:
        this.schema = userLogin;
        break;
      case USER_UPDATE:
        this.schema = userUpdate;
        break;
    }

    return Joi.object(this.schema);
  }
}

class ValidateHelper {
  asJoiSchema(target: string) {
    return new JoiSchemaMaker().createSchema(target);
  }
}

export default ValidateHelper;
