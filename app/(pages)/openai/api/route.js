import {
	messages,
	params,
	chat_completion,
	image_completion
} from "@/app/(pages)/openai/api/configuration.js";

export async function GET() {
	try {
		return new Response(JSON.stringify(messages), {
			headers: { "Content-Type": "application/json" }
		});
	} catch {
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

export async function POST(req) {
	try {
		const request = await req.json();

		messages.push({ role: "user", content: request });

		const response = await chat_completion(params);

		messages.push({
			role: "assistant",
			content: response.choices[0].message.content
		});

		if (
			response.choices[0].message.content.includes("use-dalle-system-prompt")
		) {
			const res = response.choices[0].message.content;
			const prompt = res.replace("use-dalle-system-prompt:", "");
			const image = await image_completion(prompt);

			return new Response(JSON.stringify(image.data[0].url), {
				headers: { "Content-Type": "application/json" }
			});
		} else {
			return new Response(JSON.stringify(response.choices[0].message.content), {
				headers: { "Content-Type": "application/json" }
			});
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
