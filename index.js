const express = require("express");
const app = express();

const connectDb = require("./db")

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const cors = require("cors");
const corsMiddleware = cors();

const movieRouter = require("./entry/router");

const port = process.env.PORT || 4000;

app.use(corsMiddleware);
app.use(jsonParser);

app.use(movieRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

connectDb()
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch(console.error)