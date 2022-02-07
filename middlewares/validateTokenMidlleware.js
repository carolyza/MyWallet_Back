export async function validateTokenMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  const wallet = mongoClient.db("mywallet");
  try {
    const conection = await wallet.collection("conection").findOne(token);

    if (!conection) {
      console.log("problema");
      return res.sendStatus(401);
    }

    const user = await wallet
      .collection("users")
      .findOne({ _id: conection.userId });
    if (!user) {
      return res.sendStatus(401);
    }
    delete user.password;
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
