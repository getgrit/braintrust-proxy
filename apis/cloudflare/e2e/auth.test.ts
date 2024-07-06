import { createRandomToken } from "./utils/testAuth";
import { expect, test } from "bun:test";
import { PROXY, TOKEN } from "./utils/constants";

const COMMON_HEADERS = {
  "Content-Type": "application/json",
  "X-Grit-Api": TOKEN,
};

const OPENAI_HEADERS_MISSING_GRIT_KEY = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

const OPENAI_HEADERS_COMPLETE = {
  ...COMMON_HEADERS,
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

test("auth__failsWhenMissingGritKey", async () => {
  const res = await fetch(PROXY, {
    headers: OPENAI_HEADERS_MISSING_GRIT_KEY,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "What is a proxy?",
        },
      ],
      seed: 8,
    }),
  });

  expect(res.status).toBe(400);
});

test("auth__failsWhenInvalidGritKey", async () => {
  const res = await fetch(PROXY, {
    headers: { ...OPENAI_HEADERS_MISSING_GRIT_KEY, "X-Grit-Api": "junk" },
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

  expect(res.status).toBe(401);
});

test("auth__succeedsWhenProvidedGritKey", async () => {
  const res = await fetch(PROXY, {
    headers: OPENAI_HEADERS_COMPLETE,
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

  const antCompletions = await res.json();
  expect(antCompletions.choices.length >= 1).toBe(true);
});
