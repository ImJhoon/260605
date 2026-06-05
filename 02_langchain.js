// 새로운 터미널을 하단에 (+)로 만들어서...
// npm i @langchain/core
// https://www.npmjs.com/package/@langchain/core

// 환경변수 불러오기
const dotenv = require("dotenv");
dotenv.config();

// 의존성
const express = require("express");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatGroq } = require("@langchain/groq");
const { OpenAI, ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { HumanMessage } = require("@langchain/core/messages");

// 서버 세팅
const PORT = process.env.PORT_02 ?? 3000;
const app = express();

// 미들웨어
app.use(express.json());

// 라우터, 엔드포인트 ...
app.post("/chat", async (req, res) => {
  console.log(req.body);
  const { provider, modelName, ask } = req.body;
  console.log(`프로바이더 ${provider}`);
  let model;
  switch (provider) {
    case "google-genai":
      model = await useGoogleGenAI(modelName);
      break;
    case "groq":
      model = await useGroq(modelName);
      break;
    case "nim":
      model = await useNIM(modelName);
      break;
    default:
      throw new Error("존재하지 않는 Provider입니다.");
  }

  const promptTemplate = PromptTemplate.fromTemplate(
    "당신은 MBTI가 {mbti}인 컴퓨터 강사입니다. 본인의 성격과 기질에 맞춰 뒤에 질문에 대답해주세요. {ask}",
  );

  const formattedPrompt = await promptTemplate.format({
    mbti: "ISTP",
    ask: ask,
    job: "부트캠프 강사",
  });

  const response = await model.invoke([new HumanMessage(formattedPrompt)]);

  console.log(response.content);
  res.json({ answer: response.content });
});

// 리스너
app.listen(PORT, () => {
  console.log(`${PORT}에서 Listen 중`);
});

async function useGoogleGenAI(model) {
  const result = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model,
    temperature: 0.7,
    maxOutputTokens: 512,
  });

  return result;
}

async function useGroq(model) {
  const result = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model,
    temperature: 0.7,
    maxOutputTokens: 512,
  });

  return result;
}

async function useNIM(model) {
  // https://build.nvidia.com/nvidia/nemotron-3-super-120b-a12b
  const result = new ChatOpenAI({
    configuration: {
      baseURL: "https://integrate.api.nvidia.com/v1",
    },
    apiKey: process.env.NIM_API_KEY,
    model: "nvidia/nemotron-3-super-120b-a12b",
    temperature: 0.7,
    maxOutputTokens: 512,
  });

  return result;
}
