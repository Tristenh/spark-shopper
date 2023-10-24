const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
// set token secret and expiration date
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ username, email, _id, isAdmin }) {
    const payload = { username, email, _id, isAdmin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
