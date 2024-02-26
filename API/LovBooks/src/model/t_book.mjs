import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const BookModel = (sequelize, dataType) => {
    return sequelize.define(
        "t_book",
        {
            id : {
                type :dataType.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: dataType.STRING,
                allowNull: false,            
            },
            pages : {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
export{BookModel};