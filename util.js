function getQurey(req) {
  return { userid: req.user.userid };
}

function updateData(user) {
  return {
    userimage: user.userimage,
    userdesc: user.userdesc,
    username: user.username
  };
}

module.exports = { getQurey, updateData };
