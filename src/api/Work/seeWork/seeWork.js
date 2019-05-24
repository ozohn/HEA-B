import Work from "../../../../model/work";

export default {
  Query: {
    seeWork: async (_, __, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      // const { user } = request;
      const query = { _id: req.body.workid };
      return await Work.findOne(query);
    }
  }
};
