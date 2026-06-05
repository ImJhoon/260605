// 새로운 터미널을 하단에 (+)로 만들어서...
// npm i @langchain/core
// https://www.npmjs.com/package/@langchain/core

// 환경변수 불러오기
const dotenv = require("dotenv");
dotenv.config();

// 의존성
const express = require("express");
const {} = require("@langchain/core");

// 서버 세팅
const PORT = process.env.PORT ?? 3000;
const app = express();

// 미들웨어
app.use(express.json());

// 라우터, 엔드포인트 ...
app.post("/chat", async (req, res) => {
  console.log(...req.body);
  res.json({ ...req.body });
});

// 리스너
app.listen(PORT, () => {
  console.log(`${PORT}에서 Listen 중`);
});
