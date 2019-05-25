import { User } from "../../../../model/user";

export default {
  Query: {
    currentUser: async (_, args) => {
      const query = { userid };
      const error = await User.findOne({ userid: "hsens00" });
      if (error) return true;
      return false;
    }
  }
};
