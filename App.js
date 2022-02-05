import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const app = express();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("mywallet");
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

const valueSchema = joi.object({
  value: joi
    .string()
    .pattern(/^[\d,.?!]+$/)
    .required(),
  description: joi.string().required(),
});

app.use(cors());
app.use(json());

app.post("/signup", async (req, res) => {
  try {
    const wallet = mongoClient.db("mywallet");
    const users = wallet.collection("users");

    const online = await users.find({}).toArray();

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
    // await users.insertOne(username.name);

    let newUser = {
      name: username.name,
      password: username.password,
      email: username.email,
    };
    await users.insertOne(newUser);

    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  try {
    const wallet = mongoClient.db("mywallet");
    const users = wallet.collection("users");

    const online = await users.find({}).toArray();

    const username = req.body;

    const validation = loginSchema.validate(username, { abortEarly: true });

    if (validation.error) {
      {
        res.status(422).send("Senha ou usuario incorreto");
      }
      return;
    }
    // await users.insertOne(username.name);

    let newLogin = {
      password: username.password,
      email: username.email,
    };
    await users.insertOne(newLogin);

    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

app.get("/principal/extrato", async (req, res) => {
  try {
    const wallet = mongoClient.db("mywallet");
    const buyings = wallet.collection("buyings");

    let online = [];
    online = await buyings.find({}).toArray();
    res.send(online);
  } catch {
    res.sendStatus(500);
  }
});

app.post("/entrada", async (req, res) => {
  const validation = valueSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(
      validation.error.details.map((erro) => {
        erro.message;
      })
    );
    return;
  }
});

app.post("/saida", async (req, res) => {
  const validation = valueSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(
      validation.error.details.map((erro) => {
        erro.message;
      })
    );
    return;
  }
});

app.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
