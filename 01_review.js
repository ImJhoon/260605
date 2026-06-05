const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const PORT = dotenv.PORT_01 ?? 3000;

app.listen(PORT_01, () => {
  console.log(`${PORT}에서 실행 중`);
});
