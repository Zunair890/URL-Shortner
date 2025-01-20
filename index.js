// Design a URL shortner that take avalid url and returns a shortened url.
// POST/URL - gneerate a new short url
// GET/:id- redirect to the original url
// GET/URL/analytics - get analytics or visit history of the short url


import express from "express";
import mongoose from "mongoose";
import urlRoute from "./Routes/url";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/url",urlRoute);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
