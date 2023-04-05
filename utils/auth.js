const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === 'undefined') res.sendStatus(403);

  const bearerToken = bearerHeader.split(' ')[1];
  req.token = bearerToken;

  next();
}

export {
  verifyToken,
}