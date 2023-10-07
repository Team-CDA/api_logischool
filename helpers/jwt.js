const jwt = require('jsonwebtoken');

// Fonction qui vérifie si l'utilisateur est authentifié.
module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête.
    const token = req.headers.authorization.split(" ")[1];
    // On décode le token avec la clé secrète.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // On ajoute les données de l'utilisateur à la requête.
    req.userData = decoded;
    // On passe la main au middleware suivant.
    next();
  } catch (error) {
    // Si on n'a pas réussi à décoder le token, on renvoie une erreur.
    return res.status(401).json({
      message: 'Access denied'
    });
  }
};
