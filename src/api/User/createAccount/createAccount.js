const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import User from "../../../../model/user";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userid, username, password } = args;
      const user = await User.findOne({ userid });

      if (user) {
        return false;
      } else {
        const hashedPassword = await bcrypt.hash(password.trim(), 12);
        // user = new User({
        //   userid: userid,
        //   password: hashedPassword,
        //   username: username
        // });
        // const newUser = await user.save();
        // const payload = {
        //   userid: newUser.userid,
        //   username: newUser.username
        // };
        // const token = jwt.sign(
        //   payload,
        //   process.env.TOKEN_SECRET,
        //   { expiresIn: "1d" },
        //   (err, token) => checkTokenError(err, token, res)
        // );
        return true;
      }
    }
  }
};
