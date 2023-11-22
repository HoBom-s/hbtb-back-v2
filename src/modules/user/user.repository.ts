import { myDataSource } from "../../data-source";
import User from "./user.entity";

export const userRepository = myDataSource.getRepository(User).extend({
  //
});
