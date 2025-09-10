import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { board, className, subject, chapter } = req.body;
    const prompt = `Generate 5 ${board} ${className} ${subject} questions on ${chapter} with answers and step-by-step solutions.`;

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      res.status(200).json({ questions: response.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
