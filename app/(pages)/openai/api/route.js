import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "NO KEY"
});

export const runtime = "edge";

export async function GET() {
	try {
		const response = await fetch(
			"https://status.openai.com/api/v2/status.json"
		);

		if (!response.ok) {
			throw new Error(response.status);
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(error, {
			headers: { "Content-Type": "application/json" }
		});
	}
}

export async function POST(req) {
	try {
		const { messages } = await req.json();

		let response;

		if (messages[messages.length - 1].content.startsWith("image:")) {
			const clean_text = messages[messages.length - 1].content.replace(
				"image:",
				""
			);

			const prompt = clean_text.trim();

			response = await openai.images.generate({
				model: "dall-e-3",
				prompt: prompt,
				n: 1,
				size: "1024x1024"
			});

			const message = response.data[0].revised_prompt;
			const image = response.data[0].url;

			return new Response(
				`${message}\n\n<a href=${image} target="_blank">${image}</a>`,
				{
					headers: { "Content-Type": "application/json" }
				}
			);
		} else {
			response = await openai.chat.completions.create({
				model: "gpt-4",
				stream: true,
				messages: messages
			});

			const stream = OpenAIStream(response);

			return new StreamingTextResponse(stream);
		}
	} catch (error) {
		let status = 500;
		let message = "An error occurred";

		if (error.status) {
			status = error.status;
			message = error.message || message;
		}

		return new Response(message, {
			status: status,
			headers: { "Content-Type": "application/json" }
		});
	}
}
