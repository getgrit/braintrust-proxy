import { PROXY, TOKEN } from "./utils/constants";
import { createRandomToken } from "./utils/testAuth";
import { expect, test } from "bun:test";

const COMMON_HEADERS = {
  "Content-Type": "application/json",
  "X-Grit-Api": TOKEN,
};

const OPENAI_HEADERS = {
  ...COMMON_HEADERS,
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

const ANT_HEADERS = {
  ...COMMON_HEADERS,
  Authorization: `Bearer ${process.env.ANT_API_KEY}`,
};

test("basic__routesBetweenModels", async () => {
  const res = await fetch(PROXY, {
    headers: OPENAI_HEADERS,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "What is a proxy?",
        },
      ],
      seed: 1,
    }),
  });

  expect(res.status).toBe(200);

  const openAiCompletions = await res.json();
  expect(openAiCompletions.choices.length >= 1).toBe(true);

  const antRes = await fetch(PROXY, {
    headers: ANT_HEADERS,
    method: "POST",
    body: JSON.stringify({
      model: "claude-2.1",
      messages: [
        {
          role: "user",
          content: "What is a proxy?",
        },
      ],
      seed: 1,
    }),
  });

  expect(antRes.status).toBe(200);

  const antCompletions = await antRes.json();
  expect(antCompletions.choices.length >= 1).toBe(true);
});
