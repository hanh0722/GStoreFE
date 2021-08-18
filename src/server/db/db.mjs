import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "gstorevn",
    password: "gstorevn",
    database: "gstorevn",
  },
});

export default db;