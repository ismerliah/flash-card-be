import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("deck", (table) => {
    table.uuid("id").primary().unique().defaultTo(knex.fn.uuid());
    table.string("name").unique().notNullable();
    table
      .uuid("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("deck");
}
