import { DataTypes, Sequelize } from "sequelize";
import { BookModelTable } from "../model/t_book.mjs";
import { CustomerModelTable } from "../model/t_customer.mjs";
import { customers } from "./mock-customer.mjs";
import { books } from "./mock-book.mjs";

//Informations pour la connexion à la db
const sequelize = new Sequelize("db_lovbooks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
});

const Book = BookModelTable(sequelize, DataTypes);
const Customer = CustomerModelTable(sequelize, DataTypes);


//Synchronisation avec la db
let initDB = () => {
  // Force la synchro (supprime tout les données également)
  return sequelize.sync({ force: true }).then((_) => {
    importBooks();
    importCustomers();
    console.log("La base de données a bien été synchronisée");
  });
};

//Import de tous les livres du "mock-book"
const importBooks = () => {
  books.map((book) => {
    Book.create({
      //Données des champs
      title: book.title,
      category: book.category,
      number_of_pages: book.number_of_pages,
      year_of_publication: book.year_of_publication,
      average_ratings: book.average_ratings,
      cover_image: book.cover_image,
      extract_pdf: book.extract_pdf,
      summary: book.summary,
      publisher_name: book.publisher_name,
    }).then((book) => console.log(book.toJSON()));
  });
};

//Import de tous les utilisateurs du "mock-customer"
const importCustomers = () => {
  customers.map((customer) => {
    Customer.create({
      //Données des champs
      pseudo: customer.pseudo,
      date_enter: customer.date_enter,
      password: customer.password,
    }).then((customer) => console.log(customer.toJSON()));
  });
};

export { sequelize, initDB, Book, Customer };
