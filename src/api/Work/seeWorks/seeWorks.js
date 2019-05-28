import { Work } from '../../../../model/work';

export default {
  Query: {
    seeWorks: async (_, args) => {
      const { index } = args;
      console.log(index);
      return await Work.find()
        .skip((index - 1) * 24)
        .limit(24);
    }
  }
};
