const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

export const hasOpenAIKey = () => Boolean(OPENAI_API_KEY);

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  responseFormat?: { type: "json_object" };
};

export async function openAIChat({
  model,
  messages,
  temperature = 0.2,
  responseFormat
}: ChatCompletionRequest): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const request = async (useResponseFormat: boolean): Promise<string> => {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        response_format: useResponseFormat ? responseFormat : undefined
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (
        useResponseFormat &&
        /response_format|json_object|not supported/i.test(errorText)
      ) {
        return request(false);
      }
      throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI response missing content");
    }

    return content;
  };

  return request(Boolean(responseFormat));
}
