const knex = require("../database/knex");
const HttpStatusCode = require("../httpStatusCode/HttpStatusCode");
const ApplicationError = require("../utils/ApplicationError");


class NotesController {
    async Create(request, response){
        const { tittle, description, tags, links } = request.body;
        const user_id = request.user.id;

        // knex retorna o id inserido em um array na posição 0 (retorno[0])
        const [note_id] = await knex("notes").insert({
            tittle,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("notes_links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("notes_tags").insert(tagsInsert);

        response.json();
    }

    async Show(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();

        if (!note){
            throw new ApplicationError(`Não foi possível encontrar uma nota com Id ${id}.`);
        }

        const tags = await knex("notes_tags").where({ note_id: id }).orderBy("name");
        const links = await knex("notes_links").where({ note_id: id }).orderBy("created_at");

        return response.json({
            ...note,
            tags,
            links
        });
    }

    async Delete(request, response){
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first();

        if (!note){
            throw new ApplicationError(`Não foi possível encontrar uma nota com Id ${id}.`);
        }

        await knex("notes").where({ id }).delete();

        return response.status(HttpStatusCode.Ok).json();
    }

    async Index(request, response){
        const { tittle, tags } = request.query;
        const user_id = request.user.id;

        let notes;

        if (tags)
        {
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("notes_tags")
                            .select([
                                "notes.id",
                                "notes.tittle",
                                "notes.user_id"
                            ])
                            .where("notes.user_id", user_id)
                            .whereLike("tittle", `%${tittle}%`)
                            .whereIn("name", filterTags)
                            .innerJoin("notes", "notes.id", "notes_tags.note_id")
                            .groupBy("notes.id")
                            .orderBy("notes.tittle");
        }
        else
        {
            notes = await knex("notes")
                            .where({ user_id })
                            .whereLike("tittle", `%${tittle}%`)
                            .orderBy("tittle");
        }

        const notesTagsByUser = await knex("notes_tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = notesTagsByUser.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });

        return response.status(HttpStatusCode.Ok).json(notesWithTags);
    }
}

module.exports = NotesController;
