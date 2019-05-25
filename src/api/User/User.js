import { User } from "../../../model/user";
import { Work } from "../../../model/work";

export default {
  User: {
    works: async () => await Work.find(),
    worksCount: ({ id }) => console.log(id),
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
