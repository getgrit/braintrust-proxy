type KeyNames = "OPENAI_API_KEY" | "ANT_API_KEY";
const modelToKeyName: Map<string, KeyNames> = new Map([
  ["gpt-3.5-turbo", "OPENAI_API_KEY"],
  ["claude-2.1", "ANT_API_KEY"],
]);

export function getProviderKey(modelName: string, env: Env): string | null {
  if (!modelToKeyName.has(modelName)) {
    return null;
  }

  const keyName = modelToKeyName.get(modelName);

  if (!keyName) {
    return null;
  }

  return env[keyName] ?? null;
}
