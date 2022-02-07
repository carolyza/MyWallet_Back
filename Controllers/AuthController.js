import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  try {
    const wallet = mongoClient.db("mywallet");
    const users = wallet.collection("users");
    const passwordHashed = bcrypt.hashSync(username.password, 10);

    const username = req.body;

    const validation = userSchema.validate(username, { abortEarly: true });

    if (validation.error) {
      if (validation.error.details[0].type === "any.invalid") {
        res.status(409).send("Usuário já existe");
      } else {
        res.status(422).send("Favor inserir um nome");
      }
      return;
    }

    await users.insertOne({ ...username, password: passwordHashed });

    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  const wallet = mongoClient.db("mywallet");
  const users = wallet.collection("users");

  const username = req.body;
  try {
    const login = await users.findOne(username);
    const Authorized = bcrypt.compareSync(password, username.password);
    if (Authorized) {
      const token = uuid();
      res.status(200).send({ token });
      return;
    }
    res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
