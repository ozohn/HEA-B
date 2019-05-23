import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { userid, username, userimage, userdesc } = args;
      const query = {username, userimage, userdesc}
      await User.findOneAndUpdate(query, _u.updateData(req.body));
      const updatedData = await User.findOne({userid});
      return updatedData;
    }
  }
};
