import express from "express";
import { sequelize, initDB } from "./db/sequelize.mjs";
import { booksRouter } from "./routes/bookRoutes.mjs";

import { loginRouter } from "./routes/login.mjs"; 


const app = express();
const port = 3420;
app.use(express.json());

sequelize
 .authenticate()
 .then((_) => console.log("La connexion à la base de données a bien été établie"))
 .catch((error)=>console.error("Impossible de se connecter à la DB"))
//Synchronisation de la db
initDB();

app.get("/", (req, res) => {
    res.send("Bienvenur sur l'API du projet LovBooks")
})

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`)
})

app.use("/api/books", booksRouter);
app.use("/api/login", loginRouter);

app.use(({res})=>{
    const message= "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL."
    res.status(404).json(message)
})

app.listen(port, () => {
    console.log(`L'API de LovBooks tourne sur le port http://localhost:${port}`);
})