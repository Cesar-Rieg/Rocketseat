const { hash, compare } = require("bcryptjs");
const ApplicationError = require("../utils/ApplicationError.js");
const DateTimeExtensions = require("../extensions/DateTimeExtensions.js");
const UserServices = require("../services/UserServices");

const OK = 200;
const CREATED = 201;
const SALT_HASH = 8;
const MENSAGEM_ERRO_CADASTRO = "Não foi possível completar o cadastro.";
const MENSAGEM_ERRO_EDICAO = "Não foi possível completar a edição.";

class UserController {
    /*
    Index - GET para listar vários registros
    Show - GET para exibir registro específico
    Create - POST para criar registro
    Update - PUT para atualizar registro
    Delete - DELETE para remover registro
    */

    async Create(request, response) {
        const _userServices = new UserServices();
        const { name, email, password } = request.body;

        const userDto = {
            Name: name,
            Email: email,
            Password: password,
            HashedPassword: await hash(password, SALT_HASH)
        };

        if (!userDto.Name){
            throw new ApplicationError(`${MENSAGEM_ERRO_CADASTRO} O campo nome é obrigatório.`);
        }

        let user = await _userServices.UserExistsAsync(userDto);
        if (user != null){
            throw new ApplicationError(`${MENSAGEM_ERRO_CADASTRO} Este e-mail já está em uso.`);
        }

        await _userServices.CreateUserAsync(userDto);

        return response.status(CREATED).json({
            Message: `Usuário '${userDto.Name}' criado com sucesso!`
        });
    }

    async Update(request, response){
        const _userServices = new UserServices();
        const _dateTimeExtensions = new DateTimeExtensions();
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const userRequestDto = {
            Id: user_id,
            Name: name,
            Email: email,
            Password: password,
            OldPassword: old_password
        };

        if (userRequestDto.Password && !userRequestDto.OldPassword){
            throw new ApplicationError(`${MENSAGEM_ERRO_EDICAO} Você precisa informar a senha antiga para definir a nova senha.`);
        }

        let userToUpdate = await _userServices.GetUserByIdAsync(userRequestDto);
        if (!userToUpdate){
            throw new ApplicationError(`${MENSAGEM_ERRO_EDICAO} Usuário não encontrado.`);
        }

        if (userRequestDto.Password && userRequestDto.OldPassword){
            const currentPasswordEqualsOldPassword = await compare(userRequestDto.OldPassword, userToUpdate.password);

            if (!currentPasswordEqualsOldPassword){
                throw new ApplicationError(`${MENSAGEM_ERRO_EDICAO} O campo senha antiga não confere com a senha atual do usuário.`);
            }
        }

        let userByEmail = await _userServices.GetUserByEmailAsync(userRequestDto);
        if (userByEmail != null && userByEmail.id != userToUpdate.id){
            throw new ApplicationError(`${MENSAGEM_ERRO_EDICAO} Este e-mail já está em uso.`);
        }

        const userToUpdateDto = {
            Id: userRequestDto.Id,
            Name: userRequestDto.Name ?? userToUpdate.name,
            Email: userRequestDto.Email ?? userToUpdate.email,
            Password: userRequestDto.Password,
            HashedPassword: await hash(userRequestDto.Password, SALT_HASH),
            UpdatedAt: _dateTimeExtensions.DateTimeNow()
        };

        await _userServices.UpdateUserAsync(userToUpdateDto);

        return response.status(OK).json({
            Message: `Usuário '${userToUpdateDto.Name}' editado com sucesso!`
        });
    }

    async GeneratePasswordHash(password){
        const salt = 8;
        const hashedPassword = await hash(password, salt);
        Promise.resolve(hashedPassword);
        return hashedPassword;
    }
}

module.exports = UserController;
