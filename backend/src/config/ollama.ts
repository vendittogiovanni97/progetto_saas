export async function callOllama(userMessage: string, systemPrompt: string): Promise<string> {
  const ollamaUrl = process.env.OLLAMA_URL;
  const ollamaModel = process.env.OLLAMA_MODEL;

  const response = await fetch(`${ollamaUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: ollamaModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}