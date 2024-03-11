import express from "express";
import { success } from "./helper.mjs";
import { Book } from "../db/sequelize.mjs";
import { ValidationError, Op } from "sequelize";
import { auth } from "../auth/auth.mjs";
import { Comment } from "../db/sequelize.mjs";
import { Assessment } from "../db/sequelize.mjs";

const booksRouter = express();
//Recherche tous les livres
booksRouter.get("/", (req, res) => {
    if (req.query.title) {
        return Book.findAll({
            where: { title: { [Op.like]: `%${req.query.title}%` } },
        }).then((books) => {
            const message = `Il y a ${books.length} livres qui correspondent au terme de la recherche`;
            res.json(success(message, books))
        })
    }
    return Book.findAll()
        .then((books) => {
            const message = "La liste des livres a bien été récupérée";
            res.json(success(message, books));
        })
        .catch((error) => {
            res.status(500).json("une erreur est survenue lors de la récupération des livres");
        });

});
//Recherche avec id 
booksRouter.get("/:id", (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => {
            if (book === null) {
                const message = "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant"
                return res.status(404).json({ message })
            }
            const message = `Le livre don't l'id vaut ${book.id} a bien été récupéré`
            res.json(success(message, book))
        })
        .catch((error) => {
            const message = "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants."
            res.status(500).json({ message, data: error })
        })
})

//Recherche avec id et ses comments
booksRouter.get("/:id/comments", (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => {
            if (book === null) {
                const message = "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant"
                return res.status(404).json({ message })
            }
            return Comment.findAll({
                where: { book_id: book.id },
            }).then((comments) => {
                const message = `Il y a ${comments.length} comments qui correspondent au terme de la recherche`;
                res.json(success(message, comments))
            })
        })
        .catch((error) => {
            const message = "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants."
            res.status(500).json({ message, data: error })
        })
})

booksRouter.get("/:id/notes", (req, res) => {
    Book.findByPk(req.params.id)
        .then((book) => {
            if (book === null) {
                const message = "Le livre demandé n'existe pas. Merci de réesayer avec un autre identifiant"
                return res.status(404).json({ message })
            }
            return Assessment.findAll({
                where: { book_id: book.id },
            }).then((assessments) => {
                const message = `Il y a ${assessments.length} notes qui correspondent au terme de la recherche`;
                res.json(success(message, assessments))
            })
        })
        .catch((error) => {
            const message = "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants."
            res.status(500).json({ message, data: error })
        })
})
//Ajouter une livre
booksRouter.post("/", (req, res) => {
    Book.create(req.body).then((createdBook) => {
        const message = `Le livre ${createdBook.name} a bien été créé !`;
        res.json(success(message, createdBook))
    });
});
//Ajouter une commentaire sur une livre
booksRouter.post("/:id/comments", (req, res) => {
    const bookId = req.params.id;
    const reqBody = req.body
    reqBody.book_id = bookId
    Comment.create( reqBody).then((createdComment) => {
        const message = `Le comment ${createdComment.id} a bien été créé !`;
        res.json(success(message, createdComment));
      });
})

//Ajouter une note sur une livre
booksRouter.post("/:id/note", (req, res) => {
    const bookId = req.params.id;
    const reqBody = req.body
    reqBody.book_id = bookId
    Assessment.create(req.body).then((createdUser) => {
        const message = `Le user ${createdUser.pseudo} a bien été créé !`;
        res.json(success(message, createdUser));
      });
})


booksRouter.put("/:id", (req, res) => {
    const bookId = req.params.id;
    Book.update(req.body, { where: { id: bookId } })
        .then((_) => {
            return Book.findByPk(bookId).then((updatedBook) => {
                if (updatedBook === null) {
                    const message = "Le livre demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
                    return res.status(404).json({ message })
                }
                const message = `Le livre ${updatedBook.name} dont l'id vaut ${updatedBook.id} a été mis à jour avec success`
                res.json(success(message, updatedBook));
            })
        })
        .catch((error) => {
            const message = "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        })
})

booksRouter.delete("/:id", (req, res) => {
    Book.findByPk(req.params.id)
        .then((deletedBook) => {
            if (deletedBook === null) {
                const message = "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant"
                return res.status(404).json({ message });
            }
            return Book.destroy({
                where: { id: deletedBook.id },
            }).then((_) => {
                const message = `Le livre ${deletedBook.name} a bien été supprimé !`;
                res.json(success(message, deletedBook))
            })
        })
        .catch((error) => {
            const message = "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants"
            res.status(500).json({ message, data: error })
        })
})

export { booksRouter };