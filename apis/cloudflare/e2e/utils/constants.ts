const ROOT = process.env.PROXY ?? "localhost:8787";

export const PROXY = `${ROOT}/v1/chat/completions`;
