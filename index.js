const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = "27017";
const DB_HOST = "172.18.0.2";
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

app.get("/", async (req, res) => {
  const dateTime = new Date();
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours() + 2;
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  res.json({
    environment: process.env.NODE_ENV,
    year,
    month,
    date,
    hour,
    minutes,
    seconds,
  });
});
app.listen(port, () => {
  console.log(port);
  mongoose
    .connect(URI)
    .then((result) => {
      console.log("connect to DB");
    })
    .catch((err) => {
      console.log(err);
    });
});
