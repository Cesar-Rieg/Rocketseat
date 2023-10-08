const { verify } = require("jsonwebtoken");

const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");
const ApplicationError = require("../utils/ApplicationError.js");
const AuthConfig = require("../configs/Auth.js");

function EnsureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new ApplicationError("JWT Token não informado.", HttpStatusCode.Unauthorized);

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, AuthConfig.jwt.secret);

        request.user = {
            id: Number(user_id)
        };

        return next();
    }
    catch {
        throw new ApplicationError("JWT Token inválido.", HttpStatusCode.Unauthorized);
    }
}

module.exports = EnsureAuthenticated;
