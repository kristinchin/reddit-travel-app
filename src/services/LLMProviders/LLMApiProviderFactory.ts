import { OpenAIApi } from "./OpenAIApi";
import { LLMApiProvider, LLMProviderType } from "./LLMApiProvider";

export function getLLMProvider(
  provider: LLMProviderType,
  apiKey: string,
): LLMApiProvider {
  switch (provider) {
    case LLMProviderType.OPENAI:
      return new OpenAIApi(apiKey);
  }
}
