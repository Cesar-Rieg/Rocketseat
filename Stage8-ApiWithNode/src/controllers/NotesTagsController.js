const knex = require("../database/knex");


class NotesTagsController {
    async Index(request, response) {
        const user_id = request.user.id;

        const tags = await knex("notes_tags")
                            .where("user_id", user_id)
                            .groupBy("name");

        return response.json(tags);
    }
}

module.exports = NotesTagsController;
