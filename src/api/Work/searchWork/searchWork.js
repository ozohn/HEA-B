import Work from "../../../../model/work";

export default {
  Query: {
    searchWork: async (_, args) => {
      const pattern = new RegExp(req.body.inputValue);
      return await Work.find({ worktitle: pattern });
    }
  }
};
