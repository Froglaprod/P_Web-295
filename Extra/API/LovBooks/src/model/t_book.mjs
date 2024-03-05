import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

//Model de table de "book"
const BookModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "BOOK",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number_of_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //Validation requisent
        validate: {
          isInt: {
            //Message d'erreur
            msg: "Le nombre de pages doit être un entier.",
          },
          min: {
            args: [1],
            //Message d'erreur
            msg: "Le livre doit avoir au moins une page.",
          },
        },
      },
      year_of_publication: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //Validation requisent
        validate: {
          isInt: {
            //Message d'erreur
            msg: "L'année de publication doit être un entier.",
          },
        },
      },
      average_ratings: {
        type: DataTypes.FLOAT,
      },
      cover_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      extract_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
      },
      publisher_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    //Colonne créer automatiquement et ajouté à la table
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { BookModelTable };
