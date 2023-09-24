const { hash, compare } = require("bcryptjs");
const ApplicationError = require("../utils/ApplicationError.js");
const sqliteConnection = require("../database/sqlite");
const dateTimeFormat = require('date-and-time');

const OK = 200;
const CREATED = 201;
const SALT_HASH = 8;

class UserController {
    /*
    Index - GET para listar vários registros
    Show - GET para exibir registro específico
    Create - POST para criar registro
    Update - PUT para atualizar registro
    Delete - DELETE para remover registro
    */

    async Create(request, response) {
        const { name, email, password } = request.body;

        if (!name){
            throw new ApplicationError("O campo nome é obrigatório.");
        }

        const database = await sqliteConnection();
        const checkUserExists = await database.get(`
            SELECT
                *
            FROM
                users
            WHERE
                email = (?)`,
            [email]
        );

        if (checkUserExists){
            throw new ApplicationError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, SALT_HASH);

        await database.run(`
            INSERT INTO users
                (name, email, password)
            VALUES
                (?, ?, ?)`,
            [name, email, hashedPassword]
        );

        return response.status(CREATED).json();
    }

    async Update(request, response){
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;

        const database = await sqliteConnection();
        const user = await database.get(`
            SELECT
                *
            FROM
                users
            WHERE id = (?)`,
            [id]
        );

        if (!user){
            throw new ApplicationError("Usuário não encontrado.");
        }

        if (password && !old_password){
            throw new ApplicationError("Você precisa informar a senha antiga para definir a nova senha.");
        }

        if (password && old_password){
            // const ckeckOldPassword = user.password == this.GeneratePasswordHash(old_password);
            const ckeckOldPassword = await compare(old_password, user.password);

            if (!ckeckOldPassword){
                throw new ApplicationError("O campo senha antiga não confere com a senha atual do usuário.");
            }

            user.password = await hash(password, SALT_HASH);
        }

        const userWithUpdatedEmail = await database.get(`
            SELECT
                *
            FROM
                users
            WHERE
                email = (?)`,
            [email]);

        if (userWithUpdatedEmail != null && userWithUpdatedEmail.id != user.id){
            throw new ApplicationError("Este e-mail já está em uso.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.updated_at = dateTimeFormat.format(
            new Date(), 'YYYY-MM-DD HH:mm:ss'
        );

        await database.run(`
            UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = ?
            WHERE
                id = ?`,
            [user.name, user.email, user.password, user.updated_at, id]
        );

        return response.status(OK).json();
    }

    async GeneratePasswordHash(password){
        const salt = 8;
        const hashedPassword = await hash(password, salt);
        Promise.resolve(hashedPassword);
        return hashedPassword;
    }
}

module.exports = UserController;
