const { verify } = require("jsonwebtoken");

const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");
const ApplicationError = require("../utils/ApplicationError.js");
const AuthConfig = require("../configs/Auth.js");
const DateTimeExtensions = require("../extensions/DateTimeExtensions.js");

function EnsureAuthenticated(request, response, next) {
    const _dateTimeExtensions = new DateTimeExtensions();
    const authHeader = request.headers.authorization;

    console.log(authHeader);

    if (!authHeader)
        throw new ApplicationError("JWT Token não informado.", HttpStatusCode.Unauthorized);

    //const [, token] = authHeader.split(' ');
    const token = authHeader.replace("Bearer ", "");

    try {
        const subject = verify(token, AuthConfig.jwt.secret);

        const sub = subject.sub; // Id do usuário;
        const issuedAt = _dateTimeExtensions.ParseDateTime(subject.iat); // Data de criação do token
        const expiration = _dateTimeExtensions.ParseDateTime(subject.exp); // Data de expiração do token

        console.log("Subject", {"Id": sub, "IssuedAt": issuedAt, "Expiration": expiration});

        request.user = {
            id: Number(sub)
        };

        return next();
    }
    catch {
        throw new ApplicationError("JWT Token inválido.", HttpStatusCode.Unauthorized);
    }
}

module.exports = EnsureAuthenticated;
