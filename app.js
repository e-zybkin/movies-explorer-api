require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

  app.listen(PORT);
}

main();
