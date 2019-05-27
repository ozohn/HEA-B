import { User } from "../../../../model/user";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { userid, username, userimage, userdesc } = args;
      const query = { userid };
<<<<<<< HEAD
      await User.findOneAndUpdate(query, {
        $set: {
          userid,
=======
      return await User.findOneAndUpdate(query, {
        $set: {
>>>>>>> 6c280266f9bc3663a45925880bc50e91fc3f1c25
          username,
          userimage,
          userdesc
        }
      });
<<<<<<< HEAD
      return await User.findOne(query);
=======
>>>>>>> 6c280266f9bc3663a45925880bc50e91fc3f1c25
    }
  }
};
