const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const PORT = dotenv.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`${PORT}에서 실행 중`);
});
