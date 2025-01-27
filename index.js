const express = require("express");
const app = express();
const mongoose = require("mongoose");
const redis = require("redis");
const port = process.env.PORT || 3000;

// connect to redis
async function connectToRedis() {
  const REDIS_HOST = "REDIS";
  const REDIS_PORT = 6379;
  const redisClient = await redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  });
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  redisClient.on("connect", () => console.log("Connected to redis..."));
  redisClient.connect();
}
// connect to postgres
async function connect_postgres() {
  const pg = require("pg");
  const postgres_PASSWORD = "example";
  const postgres_USER = "root";
  const postgres_PORT = "5432";
  const postgres_HOST = "postgres";
  try {
    const { Pool, Client } = pg;
    const connectionString = `postgresql://${postgres_USER}:${postgres_PASSWORD}@${postgres_HOST}:${postgres_PORT}/mydb`;

    const client = new Client({
      connectionString,
    });
    await client.connect();
    console.log("connected to postgres DB ...");
    await client.end(); // Close connection when done
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err.message);
  }
}
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
async function connect_DB() {
  const DB_USER = "root";
  const DB_PASSWORD = "example";
  const DB_PORT = "27017";
  const DB_HOST = "mongo";
  const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
  mongoose
    .connect(URI)
    .then((result) => {
      console.log("connect to DB");
    })
    .catch((err) => {
      console.log(err);
    });
}
app.listen(port, async () => {
  console.log(port);
  // await connect_DB();
  await connect_postgres();
  await connectToRedis();
});
