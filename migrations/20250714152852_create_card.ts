import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("card", (table) => {
    table.uuid("id").primary().unique().defaultTo(knex.fn.uuid());
    table.string("question").notNullable();
    table.text("answer").notNullable();
    table
      .uuid("deck_id")
      .notNullable()
      .references("id")
      .inTable("deck")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("card");
}
