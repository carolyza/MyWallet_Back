export async function deposit(req, res) {
  const wallet = mongoClient.db("mywallet");
  try {
    await wallet.collection("deposit").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function withdraw(req, res) {
  const wallet = mongoClient.db("mywallet");
  try {
    await wallet.collection("withdraw").insertOne(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
