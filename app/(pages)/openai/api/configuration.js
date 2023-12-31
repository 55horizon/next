import OpenAI from "openai";

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "NO KEY"
});

export const messages = [
	{
		role: "system",
		content:
			"You are a helpful assistant. You also have the ability to access DALL-E 3 by triggering a command that will run a prompt. If you are asked to do something that involves creating an image, repeat as follows: `use-dalle-system-prompt:` and the requested image prompt right after. You should not add any other text to that kind of response."
	}
];

export const params = {
	messages: messages,
	model: "gpt-4"
};

export const chat_completion = async (params) =>
	await openai.chat.completions.create(params);

export const image_completion = async (prompt) =>
	await openai.images.generate({
		prompt: prompt,
		n: 1,
		size: "1024x1024"
	});
