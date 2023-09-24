
exports.up = knex => knex.schema.createTable("notes_tags", table => {
    table.increments("id");
    table.text("name").notNullable();

    table.integer("user_id").references("id").inTable("users");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("notes_tags");
