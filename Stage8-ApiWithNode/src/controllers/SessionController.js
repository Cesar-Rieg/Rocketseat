const UserServices = require("../services/UserServices.js");
const ApplicationError = require("../utils/ApplicationError.js");

const { compare } = require("bcryptjs");

const AuthConfig = require("../configs/Auth.js");
const { sign } = require("jsonwebtoken");

const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");

class SessionController {
    async Create(request, response){
        const { email, password } = request.body;

        const _userServices = new UserServices();
        const { secret, expiresIn } = AuthConfig.jwt;

        const userDto = {
            Email: email,
            Password: password
        };

        const user = await _userServices.GetUserByEmailAsync(userDto);
        if (!user)
        throw new ApplicationError("Email e/ou senha inválidos.", HttpStatusCode.Unauthorized);

        const passwordMatched = await compare(userDto.Password, user.password);
        if (!passwordMatched)
            throw new ApplicationError("Email e/ou senha inválidos.", HttpStatusCode.Unauthorized);

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        return response.json({user, token});
    }
}

module.exports = SessionController;
