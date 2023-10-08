const UserServices = require("../services/UserServices.js");
const ApplicationError = require("../utils/ApplicationError.js");
const { compare } = require("bcryptjs");

const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");

class SessionController {
    async Create(request, response){
        const _userServices = new UserServices();
        const { email, password } = request.body;

        const userDto = {
            Email: email,
            Password: password
        };

        const user = await _userServices.GetUserByEmailAsync(userDto);
        if (!user)
        throw new ApplicationError("Email e/ou senha inválidos.", HttpStatusCode.Unauthorized);

        const passwordMatched = await compare(userDto.Password, user.Password);
        if (!passwordMatched)
            throw new ApplicationError("Email e/ou senha inválidos.", HttpStatusCode.Unauthorized);

        return response.json({user});
    }
}

module.exports = SessionController;
