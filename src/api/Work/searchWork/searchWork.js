import { Work } from '../../../../model/work';

export default {
  Query: {
    searchWork: async (_, args) => {
      const { term } = args;
      const pattern = new RegExp(term);
      return await Work.find({
        worktitle: pattern
      });
    }
  }
};
