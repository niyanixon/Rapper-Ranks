const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 9000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db,
  dbConnectionStr = process.env.DB_STRING
  dbName = "rap";

MongoClient.connect(dbConnectionStr).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  db.collection("messages")
    .find().sort({thumbUp: -1})
    .toArray()
    .then((data) => {
      res.render("index.ejs", { messages: data });
    })
    .catch((error) => console.error(error));
});
app.post("/messages", (req, res) => {
  db.collection("messages")
    .insertOne({
      stageName: req.body.stageName,
      birthName: req.body.birthName,
      thumbUp: 0,
    })
    .then((result) => {
      console.log("Rapper Added");
      res.redirect("/");
    })
    .catch((error) => console.error(error));
});
app.put("/messages", (req, res) => {
  db.collection("messages")
    .updateOne(
      { stageName: req.body.stageName, birthName: req.body.birthName },
      {
        $set: {
          thumbUp: req.body.thumbUp + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      res.json("Like Added");
    })
    .catch((error) => console.error(error));
});
app.put("/removeLike", (req, res) => {
  db.collection("messages")
    .updateOne(
      { stageName: req.body.stageName, birthName: req.body.birthName },
      {
        $set: {
          thumbUp: req.body.thumbUp - 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      res.json("Like Removed");
    })
    .catch((error) => console.error(error));
});
app.delete("/messages", (req, res) => {
  db.collection("messages")
    .findOneAndDelete({
      stageName: req.body.stageName,
      birthName: req.body.birthName,
    })
    .then((result) => {
      console.log("Rapper Deleted");
      res.json("Rapper Deleted");
    })
    .catch((error) => console.error(error));
});
