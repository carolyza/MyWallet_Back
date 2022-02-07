import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import db from "../database.js";

export async function signup(req, res) {
  try {
    const userInfo = req.body;
    const users = db.collection("users");
    const passwordHashed = bcrypt.hashSync(userInfo.password, 10);

    await users.insertOne({ ...userInfo, password: passwordHashed });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  const users = db.collection("users");

  const { email, password } = req.body;

  try {
    const login = await users.findOne({ email });
    const name = login.name;
    const Authorized = bcrypt.compareSync(password, login.password);

    if (!login) {
      res.sendStatus(401);
      return;
    }

    if (Authorized) {
      const token = uuid();
      await db.collection("conection").insertOne({ token, idUser: login._id });
      res.send({ name, token });

      return;
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
