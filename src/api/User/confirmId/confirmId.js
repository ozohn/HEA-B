import { User } from '../../../../model/user';

export default {
  Mutation: {
    confirmId: async (_, args) => {
      return (await User.findOne({ userid: args.userid })) ? true : false;
    }
  }
};
