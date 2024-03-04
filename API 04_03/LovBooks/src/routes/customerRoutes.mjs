import express from "express";
import { success } from "./helper.mjs";
import { Customer } from "../db/sequelize.mjs";

//Instance de express, afin de créer des routes
const customersRouter = express();

//Routes GET liste user
customersRouter.get("/", (req, res) => {
  return (
    Customer.findAll()
      //Récupération liste user
      .then((customers) => {
        const message = "La liste des users a bien été récupérée";
        res.json(success(message, customers));
      })
      //Gestion erreur 500
      .catch((error) => {
        res
          .status(500)
          .json("une erreur est survenue lors de la récupération des users");
      })
  );
});

//Routes GET user avec id
customersRouter.get("/:id", (req, res) => {
  // Rechercher un user par sa clé primaire (id)
  Customer.findByPk(req.params.id)

    .then((customer) => {
      //Gestion erreur 404
      if (customer === null) {
        const message =
          "Le user demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération user
      const message = `Le user don't l'id vaut ${customer.id} a bien été récupéré`;
      res.json(success(message, customer));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le user n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes POST user
customersRouter.post("/", (req, res) => {
  //Créer un nouveaux user a partir des données
  Customer.create(req.body).then((createdUser) => {
    const message = `Le user ${createdUser.pseudo} a bien été créé !`;
    res.json(success(message, createdUser));
  });
});

//Routes PUT user
customersRouter.put("/:id", (req, res) => {
  const customerId = req.params.id;
  Customer.update(req.body, { where: { id: customerId } })
    .then((_) => {
      return Customer.findByPk(customerId).then((updatedCustomer) => {
        //Gestion erreur 400
        if (updatedCustomer === null) {
          const message =
            "Le user demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'user
        const message = `Le user ${updatedCustomer.pseudo} dont l'id vaut ${updatedCustomer.id} a été mis à jour avec success`;
        res.json(success(message, updatedCustomer));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le user n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

customersRouter.delete("/:id", (req, res) => {
    // Rechercher un user par sa clé primaire (id)
    Customer.findByPk(req.params.id)
      .then((deletedCustomer) => {
        //Gestion erreur 400
        if (deletedCustomer === null) {
          const message =
            "Le user demandé n'existe pas. Merci de réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Book.destroy({
          where: { id: deletedCustomer.id },
          //Delete de l'user
        }).then((_) => {
          const message = `Le user ${deletedCustomer.pseudo} a bien été supprimé !`;
          res.json(success(message, deletedCustomer));
        });
      })
      //Gestion erreur 500
      .catch((error) => {
        const message =
          "Le user n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { customersRouter };