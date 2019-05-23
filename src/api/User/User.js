import User from "../../../model/user";
import Work from "../../../model/work";

export default {
  User: {
    getUserInfo: async ({ userid }) => await Work.find({ userid }),
    getSearchedUsers: async ({ username }) => {
      const pattern = new RegExp(req.body.inputValue);
      const user = await User.find(
        { username: pattern },
        { userid: true, username: true, userimage: true, userdesc: true }
      );
      if (user) {
        return user;
      } else {
        return false;
        // res.status(404).send({ message: "일치하는 정보 없음" });
      }
    }
  }
};
