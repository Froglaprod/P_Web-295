import {DataTypes, Sequelize } from "sequelize";
import { BookModel } from "../model/t_book.mjs";

const sequelize = new Sequelize (
    "db_lovbooks",
    "root",
    "root",
    {
        host : "localhost",
        dialect : "mysql",
        port: 6033,
        logging : false,
    }
)
const Book = BookModel(sequelize, DataTypes);

let initDB = () => {
    //A
    return sequelize.sync({ force: true }).then((_) => {
      importBooks();
      console.log("La base de données a bien été synchronisée");
    });
  };

const importBooks = () => {
    Book.create({
        name: "Apocalypse",
        pages: 666,
    })
}

export {sequelize, initDB, Book};