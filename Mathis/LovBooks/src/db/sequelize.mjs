// Import des models
import { DataTypes, Sequelize } from "sequelize";
import { BookModelTable } from "../model/t_book.mjs";
import { CustomerModelTable } from "../model/t_customer.mjs";
import { AssessmentModelTable } from "../model/t_assessment.mjs"; 
import { AuthorModelTable } from "../model/t_author.mjs"; 
import { PublisherModelTable } from "../model/t_publisher.mjs"; 
import { CategoryModelTable } from "../model/t_category.mjs"; 
import { CommentModelTable } from "../model/t_comment.mjs"; 

// Import de données
import { books } from "./mock-book.mjs";
import { customers } from "./mock-customer.mjs";
import { authors } from "./mock-author.mjs";
import { publishers } from "./mock-publisher.mjs";
import { comments } from "./mock-comment.mjs";
import { categorys } from "./mock-category.mjs";
import { assessments } from "./mock-assessment.mjs";

// Informations pour la connexion à la db
const sequelize = new Sequelize("db_lovbooks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
});

// Création des modèles
const Book = BookModelTable(sequelize, DataTypes);
const Customer = CustomerModelTable(sequelize, DataTypes);
const Assessment = AssessmentModelTable(sequelize, DataTypes);
const Author = AuthorModelTable(sequelize, DataTypes);
const Publisher = PublisherModelTable(sequelize, DataTypes);
const Category = CategoryModelTable(sequelize, DataTypes);
const Comment = CommentModelTable(sequelize, DataTypes);

//Liaisons entre models
//Livres / Categories
Book.belongsTo(Category, {
  foreignKey: "category_id",
});
Category.hasMany(Book, {
  foreignKey: "category_id",
});

// Synchronisation avec la db
let initDB = () => {
  // Force la synchronisation (supprime toutes les données également)
  return sequelize.sync({ force: true }).then((_) => {
    importCategory();
    importBooks();
    importCustomers();
    importAssessment();
    importComment();
    importPublisher();
    importAuthors();
    console.log("La base de données a bien été synchronisée");
  });
};

// Import de tous les livres du "mock-book"
const importBooks = () => {
  books.map((book) => {
    Book.create({
      // Données des champs
      title: book.title,
      category_id: book.category_id,
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

// Import de tous les utilisateurs du "mock-customer"
const importCustomers = () => {
  customers.map((customer) => {
    Customer.create({
      // Données des champs
      pseudo: customer.pseudo,
      date_enter: customer.date_enter,
      password: customer.password,
    }).then((customer) => console.log(customer.toJSON()));
  });
};

// Import de tous les auteur du "mock-author"
const importAuthors = () => {
  authors.map((author) => {
    Author.create({
      // Données des champs
      first_name: author.first_name,
      name: author.name
    }).then((author) => console.log(author.toJSON()));
  });
};

// Import de tous les editeurs du "mock-publisher"
const importPublisher = () => {
  publishers.map((publisher) => {
    Publisher.create({
      // Données des champs
      edition_date: publisher.edition_date,
      name: publisher.name
    }).then((publisher) => console.log(publisher.toJSON()));
  });
};

// Import de tous les commentaires du "mock-comment"
const importComment = () => {
  comments.map((comment) => {
    Comment.create({
      // Données des champs
      created_at: comment.created_at,
      content: comment.content
    }).then((comment) => console.log(comment.toJSON()));
  });
};

// Import de tous les notes du "mock-assessment"
const importAssessment = () => {
  assessments.map((assessment) => {
    Assessment.create({
      // Données des champs
      assessment: assessment.assessment,
    }).then((assessment) => console.log(assessment.toJSON()));
  });
};

// Import de tous les categories du "mock-category"
const importCategory = () => {
  categorys.map((category) => {
    Category.create({
      // Données des champs
      name: category.name,
    }).then((category) => console.log(category.toJSON()));
  });
};
export { sequelize, Book, Customer, Assessment, Author, Publisher, Category, Comment, initDB };
