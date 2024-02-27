import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

//Model de table de "user"

const CustomerModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "CUSTOMER",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        //Validation requisent
        validate: {
          notEmpty: {
            //Message d'erreur
            msg: "Le pseudo ne peut pas être vide.",
          },
        },
      },
      date_enter: {
        type: DataTypes.DATE,
        allowNull: false,
        //Validation requisent
        validate: {
          isDate: {
            msg: "La date doit être au format valide.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        //Validation requisent
        validate: {
          notEmpty: {
            //Message d'erreur
            msg: "Le mot de passe ne peut pas être vide.",
          },
        },
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

export { CustomerModelTable };
