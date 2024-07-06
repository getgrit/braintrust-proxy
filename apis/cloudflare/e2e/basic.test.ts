import { PROXY, TOKEN } from "./utils/constants";
import { createRandomToken } from "./utils/testAuth";
import { expect, test } from "bun:test";

const COMMON_HEADERS = {
  "Content-Type": "application/json",
  "X-Grit-Api": TOKEN,
};

test("basic__routesBetweenModels", async () => {
  const res = await fetch(PROXY, {
    headers: COMMON_HEADERS,
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
    headers: COMMON_HEADERS,
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
