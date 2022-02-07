import express, { json } from "express";
import cors from "cors";

import router from "./routes/indexRouter.js";

const app = express();

// const loginSchema = joi.object({
//   email: joi.string().required(),
//   password: joi.string().required(),
// });

// const userSchema = joi.object({
//   name: joi.string().required(),
//   email: joi.string().required(),
//   password: joi.string().required(),
// });

// const valueSchema = joi.object({
//   value: joi
//     .string()
//     .pattern(/^[\d,.?!]+$/)
//     .required(),
//   description: joi.string().required(),
// });

app.use(cors());
app.use(json());
app.use(router);

// app.post("/signup", async (req, res) => {
//   try {
//     const wallet = mongoClient.db("mywallet");
//     const users = wallet.collection("users");
//     const passwordHashed = bcrypt.hashSync(username.password, 10);

//     const username = req.body;

//     const validation = userSchema.validate(username, { abortEarly: true });

//     if (validation.error) {
//       if (validation.error.details[0].type === "any.invalid") {
//         res.status(409).send("Usuário já existe");
//       } else {
//         res.status(422).send("Favor inserir um nome");
//       }
//       return;
//     }

//     await users.insertOne({ ...username, password: passwordHashed });

//     res.sendStatus(201);
//   } catch {
//     res.sendStatus(500);
//   }
// });

// app.post("/login", async (req, res) => {
//   const wallet = mongoClient.db("mywallet");
//   const users = wallet.collection("users");

//   const username = req.body;

//   const validation = loginSchema.validate(username, { abortEarly: true });

//   if (validation.error) {
//     {
//       res.status(422).send("Senha ou usuario incorreto");
//     }
//     return;
//   }
//   try {
//     const login = await users.findOne(username);
//     const Authorized = bcrypt.compareSync(password, username.password);
//     if (Authorized) {
//       const token = uuid();
//       res.status(200).send({ token });
//       return;
//     }
//     res.sendStatus(401);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// app.get("/saida", async (req, res) => {
//   try {
//     const wallet = mongoClient.db("mywallet");
//     const buyings = wallet.collection("withdraw");

//     let online = [];
//     online = await buyings.find({}).toArray();
//     res.send(online);
//   } catch {
//     res.sendStatus(500);
//   }
// });

// app.get("/entrada", async (req, res) => {
//   try {
//     const wallet = mongoClient.db("mywallet");
//     const buyings = wallet.collection("deposit");

//     let online = [];
//     online = await buyings.find({}).toArray();
//     res.send(online);
//   } catch {
//     res.sendStatus(500);
//   }
// });

// app.post("/entrada", async (req, res) => {
//   const wallet = mongoClient.db("mywallet");
//   const validation = valueSchema.validate(req.body);

//   if (validation.error) {
//     res.status(422).send(
//       validation.error.details.map((erro) => {
//         erro.message;
//       })
//     );
//     return;
//   }
//   try {
//     await wallet.collection("deposit").insertOne(req.body);
//     res.sendStatus(201);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// app.post("/saida", async (req, res) => {
//   const validation = valueSchema.validate(req.body);
//   const wallet = mongoClient.db("mywallet");

//   if (validation.error) {
//     res.status(422).send(
//       validation.error.details.map((erro) => {
//         erro.message;
//       })
//     );
//     return;
//   }
//   try {
//     await wallet.collection("withdraw").insertOne(req.body);
//     res.sendStatus(201);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
