const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { User } from "../../../../model/user";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    createAccount: async (_, args, { request }) => {
      const { userid, username, password } = args;
      let user = await User.findOne({ userid });

      if (user) {
        throw new Error("중복된 id입니다.");
      } else {
        const hashedPassword = await bcrypt.hash(password.trim(), 12);
        user = new User({
          userid: userid,
          password: hashedPassword,
          username: username
        });
        await user.save();
        return generateToken({ userid });
      }
    }
  }
};
