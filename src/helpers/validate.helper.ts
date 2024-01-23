import Joi from "joi";
import { ValidateObject } from "../types/common.type";
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
  private schema: ValidateObject;

  createSchema(target: string) {
    switch (target) {
      case "idParam":
        this.schema = idParam;
        break;
      case "articleCreate":
        this.schema = articleCreate;
        break;
      case "articleUpdate":
        this.schema = articleUpdate;
        break;
      case "categoryCreate":
        this.schema = categoryCreate;
        break;
      case "categoryUpdate":
        this.schema = categoryUpdate;
        break;
      case "tagCreate":
        this.schema = tagCreate;
        break;
      case "tagUpdate":
        this.schema = tagUpdate;
        break;
      case "userCreate":
        this.schema = userCreate;
        break;
      case "userLogin":
        this.schema = userLogin;
        break;
      case "userUpdate":
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
