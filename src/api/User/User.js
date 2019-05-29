import { User } from "../../../model/user";
import { Work } from "../../../model/work";

export default {
  User: {
    worksCount: ({ id }) => console.log(id),
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
