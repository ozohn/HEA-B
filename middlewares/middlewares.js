const jwt = require('jsonwebtoken');

function checkAuth(header) {
	console.log(header);
	const token = header.split(' ')[1];
	if(token) {
		jwt.verify(token, process.env.TOKEN_SECRET, checkVerify)
	} else {
		next();
	}
}

function checkVerify(req, err, user) {
	if(err) {
		console.log(err)
	}
	req.user = user;
}

function checkToken(req, res, next) {
	const authHeader = req.get('authorization');
	if(authHeader) {
		checkAuth(authHeader);
	} else {
		next();
	}
	// console.log(authHeader);
  // if (authHeader) {
  //   const token = authHeader.split(' ')[1];
  //   if (token) {
  //     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       req.user = user;
  //       next();
  //     });
  //   }
  //   next();
  // } else {
  //   next();
  // }
}
//indent 를 줄이는 리팩토링
function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    const error = new Error('Un-Authorized');
    res.state(401);
    next(error);
  }
}

module.exports = {
  checkToken,
  isLoggedIn,
};
