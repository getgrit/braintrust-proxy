const PROXY = "https://proxy.admin-a65.workers.dev/v1/chat/completions";

const OPENAI_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
};

const ANT_HEADERS = {
  Authorization: `Bearer ${process.env.ANT_API_KEY}`,
};

async function basic() {
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

  const openAiCompletions = await res.json();

  console.dir(openAiCompletions.choices[0]);

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

  const antCompletions = await antRes.json();

  console.dir(antCompletions.choices[0]);
}

basic();
