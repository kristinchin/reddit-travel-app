import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import {
  PromptResult,
  LLMApiProvider,
  LLMProviderType,
} from "./LLMApiProvider";

export class OpenAIApi implements LLMApiProvider {
  apiKey: string;
  openai: OpenAI;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.openai = new OpenAI({
      // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  provider() {
    return LLMProviderType.OPENAI;
  }

  // This already uses my OpenAI API key environment variable
  async submitPrompt(comments: string): Promise<PromptResult[]> {
    // OpenAI prompt for extracting locations
    const prompt = `Extract names of positively recommended locations to visit 
    from this Reddit thread.
    Return these locations as an array of JSON objects with the             
    corresponding City and State of the location and a 1 sentence description of the place.
    .\n\nReddit thread comments:\n${comments}`;

    const place: z.ZodObject<any> = z.object({
      name: z.string(),
      city: z.string(),
      state: z.string(),
      description: z.string(),
    });

    const placeArray = z.object({
      places: z.array(place),
      // final_answer: z.string(),
    });

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      response_format: zodResponseFormat(placeArray, "place_array"),
      // max_tokens: 150,
    });

    let output = response.choices[0].message?.content ?? "[]";
    console.log("output: ", output);
    let result = JSON.parse(output);

    return result.places;
  }
}
