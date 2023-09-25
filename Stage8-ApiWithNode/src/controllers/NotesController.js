const knex = require("../database/knex");
const ApplicationError = require("../utils/ApplicationError");


class NotesController {
    async Create(request, response){
        const { tittle, description, tags, links } = request.body;
        const { user_id } = request.params;

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

        return response.status(200).json();
    }

    async Index(request, response){
        const { user_id, tittle, tags } = request.query;

        let notes;

        if (tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("notes_tags")
                            .whereIn("name", filterTags);
        }else {
            notes = await knex("notes")
                            .where({ user_id })
                            .whereLike("tittle", `%${tittle}%`)
                            .orderBy("tittle");
        }
        return response.status(200).json(notes);
    }
}

module.exports = NotesController;
