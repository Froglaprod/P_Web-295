import express from "express";
import { success } from "./helper.mjs";
import { Assessment } from "../db/sequelize.mjs";

//Instance de express, afin de créer des routes
const assessmentRouter = express();

//Routes GET liste user
assessmentRouter.get("/", (req, res) => {
  return (
    Assessment.findAll()
      //Récupération liste user
      .then((Assessments) => {
        const message = "La liste des users a bien été récupérée";
        res.json(success(message, Assessments));
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
assessmentRouter.get("/:id", (req, res) => {
  // Rechercher un user par sa clé primaire (id)
  Assessment.findByPk(req.params.id)

    .then((Assessment) => {
      //Gestion erreur 404
      if (Assessment === null) {
        const message =
          "Le user demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération user
      const message = `Le user don't l'id vaut ${Assessment.id} a bien été récupéré`;
      res.json(success(message, Assessment));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le user n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes POST user
assessmentRouter.post("/", (req, res) => {
  //Créer un nouveaux user a partir des données
  Assessment.create(req.body).then((createdUser) => {
    const message = `Le user ${createdUser.pseudo} a bien été créé !`;
    res.json(success(message, createdUser));
  });
});

//Routes PUT user
assessmentRouter.put("/:id", (req, res) => {
  const AssessmentId = req.params.id;
  Assessment.update(req.body, { where: { id: AssessmentId } })
    .then((_) => {
      return Assessment.findByPk(AssessmentId).then((updatedAssessment) => {
        //Gestion erreur 400
        if (updatedAssessment === null) {
          const message =
            "Le user demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'user
        const message = `Le user ${updatedAssessment.pseudo} dont l'id vaut ${updatedAssessment.id} a été mis à jour avec success`;
        res.json(success(message, updatedAssessment));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le user n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes DELETE user
assessmentRouter.delete("/:id", (req, res) => {
    // Rechercher un user par sa clé primaire (id)
    Assessment.findByPk(req.params.id)
      .then((deletedAssessment) => {
        //Gestion erreur 400
        if (deletedAssessment === null) {
          const message =
            "Le user demandé n'existe pas. Merci de réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Assessment.destroy({
          where: { id: deletedAssessment.id },
          //Delete de l'user
        }).then((_) => {
          const message = `Le user ${deletedAssessment.pseudo} a bien été supprimé !`;
          res.json(success(message, deletedAssessment));
        });
      })
      //Gestion erreur 500
      .catch((error) => {
        const message =
          "Le user n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { assessmentRouter };
