import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.json({ msg: "Não autorizado" });
  }

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(401).json({ msg: "Não autorizado" });

          req.usuario = result;
          next();
        }
      );
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
};