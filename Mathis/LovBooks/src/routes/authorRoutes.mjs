import express from "express";
import { success } from "./helper.mjs";
import { Author } from "../db/sequelize.mjs";

//Instance de express, afin de créer des routes
const authorsRouter = express();

//Routes GET liste Author
authorsRouter.get("/", (req, res) => {
  return (
    Author.findAll()
      //Récupération liste Author
      .then((Authors) => {
        const message = "La liste des Author a bien été récupérée";
        res.json(success(message, Authors));
      })
      //Gestion erreur 500
      .catch((error) => {
        res
          .status(500)
          .json("une erreur est survenue lors de la récupération des Author");
      })
  );
});

//Routes GET Author avec id
authorsRouter.get("/:id", (req, res) => {
  // Rechercher un Author par sa clé primaire (id)
  Author.findByPk(req.params.id)

    .then((Authors) => {
      //Gestion erreur 404
      if (Authors === null) {
        const message =
          "Le Author demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération Author
      const message = `Le Author don't l'id vaut ${Authors.id} a bien été récupéré`;
      res.json(success(message, Authors));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le Author n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes POST Author
authorsRouter.post("/", (req, res) => {
  //Créer un nouveaux Author a partir des données
  Author.create(req.body).then((createdAuthor) => {
    const message = `Le Author ${createdAuthor.name} a bien été créé !`;
    res.json(success(message, createdAuthor));
  });
});

//Routes PUT Author
authorsRouter.put("/:id", (req, res) => {
  const AuthorId = req.params.id;
  Author.update(req.body, { where: { id: AuthorId } })
    .then((_) => {
      return Author.findByPk(AuthorId).then((updatedAuthor) => {
        //Gestion erreur 400
        if (updatedAuthor === null) {
          const message =
            "Le Author demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'Author
        const message = `Le Author ${updatedAuthor.name} dont l'id vaut ${updatedAuthor.id} a été mis à jour avec success`;
        res.json(success(message, updatedAuthor));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le Author n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes DELETE Author
authorsRouter.delete("/:id", (req, res) => {
    // Rechercher un Author par sa clé primaire (id)
    Author.findByPk(req.params.id)
      .then((deletedAuthor) => {
        //Gestion erreur 400
        if (deletedAuthor === null) {
          const message =
            "Le Author demandé n'existe pas. Merci de réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Book.destroy({
          where: { id: deletedAuthor.id },
          //Delete de l'Author
        }).then((_) => {
          const message = `Le Author ${deletedAuthor.name} a bien été supprimé !`;
          res.json(success(message, deletedAuthor));
        });
      })
      //Gestion erreur 500
      .catch((error) => {
        const message =
          "Le Author n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { authorsRouter };
