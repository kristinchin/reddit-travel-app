export interface LLMApiProvider {
  // getLocationsFromComments(): PromptResult[];
  provider(): LLMProviderType;
  submitPrompt(comments: string): Promise<PromptResult[]>;
}

export interface PromptResult {
  name: string;
  city: string;
  state: string;
  description: string;
}

export enum LLMProviderType {
  OPENAI = "openai",
}
