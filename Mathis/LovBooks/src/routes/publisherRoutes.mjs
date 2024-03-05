import express from "express";
import { success } from "./helper.mjs";
import { Publisher } from "../db/sequelize.mjs";


//Instance de express, afin de créer des Publishers
const publisherRouter = express();

//Publishers GET liste Publisher
publisherRouter.get("/", (req, res) => {
  return (
    Publisher.findAll()
      //Récupération liste Publisher
      .then((Publishers) => {
        const message = "La liste des Publisher a bien été récupérée";
        res.json(success(message, Publishers));
      })
      //Gestion erreur 500
      .catch((error) => {
        res
          .status(500)
          .json("une erreur est survenue lors de la récupération des Publisher");
      })
  );
});

//Publishers GET Publisher avec id
publisherRouter.get("/:id", (req, res) => {
  // Rechercher un Publisher par sa clé primaire (id)
  Publisher.findByPk(req.params.id)

    .then((Publishers) => {
      //Gestion erreur 404
      if (Publishers === null) {
        const message =
          "Le Publisher demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération Publisher
      const message = `Le Publisher don't l'id vaut ${Publishers.id} a bien été récupéré`;
      res.json(success(message, Publishers));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le Publisher n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Publishers POST Publisher
publisherRouter.post("/", (req, res) => {
  //Créer un nouveaux Publisher a partir des données
  Publisher.create(req.body).then((createdPublisher) => {
    const message = `Le Publisher ${createdPublisher.name} a bien été créé !`;
    res.json(success(message, createdPublisher));
  });
});

//Publishers PUT Publisher
publisherRouter.put("/:id", (req, res) => {
  const PublisherId = req.params.id;
  Publisher.update(req.body, { where: { id: PublisherId } })
    .then((_) => {
      return Publisher.findByPk(PublisherId).then((updatedPublisher) => {
        //Gestion erreur 400
        if (updatedPublisher === null) {
          const message =
            "Le Publisher demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'Publisher
        const message = `Le Publisher ${updatedPublisher.name} dont l'id vaut ${updatedPublisher.id} a été mis à jour avec success`;
        res.json(success(message, updatedPublisher));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le Publisher n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Publishers DELETE Publisher
publisherRouter.delete("/:id", (req, res) => {
    // Rechercher un Publisher par sa clé primaire (id)
    Publisher.findByPk(req.params.id)
      .then((deletedPublisher) => {
        //Gestion erreur 400
        if (deletedPublisher === null) {
          const message =
            "Le Publisher demandé n'existe pas. Merci de réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Book.destroy({
          where: { id: deletedPublisher.id },
          //Delete de l'Publisher
        }).then((_) => {
          const message = `Le Publisher ${deletedPublisher.name} a bien été supprimé !`;
          res.json(success(message, deletedPublisher));
        });
      })
      //Gestion erreur 500
      .catch((error) => {
        const message =
          "Le Publisher n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { publisherRouter};
