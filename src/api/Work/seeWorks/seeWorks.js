import { Work } from "../../../../model/work";

export default {
  Query: {
    seeWorks: async _ => {
      return await Work.find();
    }
  }
};
