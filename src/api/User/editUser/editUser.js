import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { userid, username, userimage, userdesc } = args;
      const query = { userid };
      await User.findOneAndUpdate(query);
      const updatedData = await User.findOne(query, {
        userid: true,
        username: true,
        userimage: true,
        userdesc: true
      });

      return updatedData;
    }
  }
};
