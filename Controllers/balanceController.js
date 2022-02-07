import db from "../database.js";

export async function postWithdraw(req, res) {
  const credit = req.body;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("conection").findOne({ token });
    if (!session) {
      res.sendStatus(401);
      return;
    }
    await db
      .collection("withdraw")
      .insertOne({ ...credit, idUser: session.idUser });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function postDeposit(req, res) {
  const credit = req.body;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("conection").findOne({ token });
    if (!session) {
      res.sendStatus(401);
      return;
    }
    await db
      .collection("deposit")
      .insertOne({ ...credit, idUser: session.idUser });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function getDeposit(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("conection").findOne({ token });
    if (!session) {
      res.sendStatus(401);
      return;
    }
    const credits = await db
      .collection("deposit")
      .find({ idUser: session.idUser })
      .toArray();
    res.send(credits);
  } catch {
    res.sendStatus(500);
  }
}

export async function getWithdraw(req, res) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("conection").findOne({ token });
    if (!session) {
      res.sendStatus(401);
      return;
    }
    const credits = await db
      .collection("withdraw")
      .find({ idUser: session.idUser })
      .toArray();
    res.send(credits);
  } catch {
    res.sendStatus(500);
  }
}
