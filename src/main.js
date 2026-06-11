import 'dotenv/config'; 
import express from "express";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is up and running on http://localhost:${PORT}`);
});
