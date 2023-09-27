const sqliteConnection = require("../database/sqlite");

class UserServices {
    
    async CreateUserAsync(userDto){
        const database = await sqliteConnection();
        
        let sqlParameters = [
            userDto.Name, 
            userDto.Email,
            userDto.HashedPassword
        ];

        return await database.run(`
            INSERT INTO users
                (name, email, password)
            VALUES
                (?, ?, ?)`,
            sqlParameters
        );
    }

    async GetUserByIdAsync(userDto){
        const database = await sqliteConnection();

        let sqlParameter = [
            userDto.Id
        ];

        return await database.get(`
            SELECT
                *
            FROM
                users
            WHERE 
                id = (?)`,
            sqlParameter
        );
    }

    async GetUserByEmailAsync(userDto){
        const database = await sqliteConnection();
        
        let sqlParameters = [
            userDto.Email
        ];

        return await database.get(`
            SELECT
                *
            FROM
                users
            WHERE
                email = (?)`,
            sqlParameters
        );
    }

    async UpdateUserAsync(userDto){
        const database = await sqliteConnection();

        let sqlParameters = [
            userDto.Name,
            userDto.Email,
            userDto.HashedPassword,
            userDto.UpdatedAt,
            userDto.Id
        ];

        return await database.run(`
            UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = ?
            WHERE
                id = ?`,
            sqlParameters
        );
    }
}

module.exports =  UserServices;