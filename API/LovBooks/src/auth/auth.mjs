import jwt from "jsonwebtoken";
import { privatekey } from "./private_key.mjs";

const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête,`
        return res.status(401).json({message})
    } else{
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(
            toekn,
            privatekey,
            (error, decodedToken) => {
                if (error) {
                    const message = `L'utilistaeur n'est pas autorisé à accéder à cette ressource.`
                    return res.status(401).json({message, data: error})
                }
                const userId = decodedToken.userId;
                if (req.body.userId && req.body.userId !== userId){
                    const message = `L'identifiant de l'utilisateur est invalide`
                    return res.status(401).json({message});
                } else {
                    next();
                }
            }
        )
    }
}
export {aut}