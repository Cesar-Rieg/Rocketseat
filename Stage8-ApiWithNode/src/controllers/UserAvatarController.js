const UserServices = require("../services/UserServices.js");
const ApplicationError = require("../utils/ApplicationError.js");
const DiskStorage = require("../providers/DiskStorage.js");
const DateTimeExtensions = require("../extensions/DateTimeExtensions.js");
const HttpStatusCode = require("../httpStatusCode/HttpStatusCode.js");

class UserAvatarController {
    async Update(request, response){
        const _userServices = new UserServices();
        const _diskStorage = new DiskStorage();
        const _dateTimeExtensions = new DateTimeExtensions();

        const requestFileName = request.file.filename;
        const userDto = {
            Id: request.user.id,
            Avatar: null,
            UpdatedAt: _dateTimeExtensions.DateTimeNow()
        };

        let user = await _userServices.GetUserByIdAsync(userDto);

        if (!user)
            throw new ApplicationError("A alteração da foto de perfil somente é permitida para usuários autenticados.", HttpStatusCode.Unauthorized);

        if (user.avatar){
            await _diskStorage.DeleteFile(user.avatar);
        }

        let fileName = await _diskStorage.SaveFile(requestFileName);
        userDto.Avatar = fileName;

        await _userServices.UpdateUserAvatarAsync(userDto);
        user = await _userServices.GetUserByIdAsync(userDto);

        return response.json(user);
    }
}

module.exports = UserAvatarController;
