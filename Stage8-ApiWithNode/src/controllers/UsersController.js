const ApplicationError = require("../utils/ApplicationError.js");

const OK = 200;
const CREATED = 201;

class UserController {
    /*
    Index - GET para listar vários registros
    Show - GET para exibir registro específico
    Create - POST para criar registro
    Update - PUT para atualizar registro
    Delete - DELETE para remover registro
    */

    Create(request, response) {
        const { name, email, password } = request.body;

        if (!name){
            throw new ApplicationError("O campo nome é obrigatório.");
        }

        // response.send() Retorna no formato HTML
        //response.send(`Você chamou método POST. ${message}`);

        // response.json() Retorna no formato JSON
        response.status(CREATED).json({name, email, password});
    }
}

module.exports = UserController;
