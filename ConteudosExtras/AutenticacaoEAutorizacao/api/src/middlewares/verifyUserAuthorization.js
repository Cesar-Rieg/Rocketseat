const AppError = require("../utils/AppError");

function verifyUserAuthorization(userRole) {
    return (request, response, next) => {
        const { role } = request.user;

        if (!userRole.includes(role)) {
            throw new AppError("Unauthorized request from this user.", 401);
        }

        return next();
    }
}

module.exports = verifyUserAuthorization;