import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, photo, bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            name
          },
          {}
        ]
      });
      if (exists) {
        throw Error("This name /  is already taken");
      }
      await prisma.createUser({
        name,
        photo,
        bio
      });
      return true;
    }
  }
};
