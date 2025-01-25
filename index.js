const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.get("/", async (req, res) => {
  const dateTime = new Date();
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours() + 33;
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
});
