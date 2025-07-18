import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.uuid("id").primary().unique().defaultTo(knex.fn.uuid());
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("users");
}

