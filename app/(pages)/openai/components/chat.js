"use client";

import { useState, useEffect, useRef } from "react";
import { roboto_mono } from "@/app/styles/fonts.js";
import database from "@/app/database.json";

export default function Chat() {
	const [message, setMessage] = useState(database.pages.openai.intro.text[0]);
	const [prompt, setPrompt] = useState("");
	const [rows, setRows] = useState(1);
	const defaultPlaceholder = database.pages.openai.placeholder.default.text[0];
	const processingPlaceholder =
		database.pages.openai.placeholder.processing.text[0];
	const errorPlaceholder = database.pages.openai.placeholder.error.text[0];
	const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
	const isRunning = useRef(false);

	useEffect(() => {
		if (!isRunning.current) {
			isRunning.current = true;
			postMessage("Hello");
		}
	}, []);

	function postMessage(prompt) {
		console.log(`User: ${prompt}`);
		fetch("/openai/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(prompt)
		})
			.then(async (response) => {
				if (!response.ok) {
					const msg = await response.text();
					throw new Error(msg);
				}
				return response.json();
			})
			.then((promise) => {
				console.log(`Assistant: ${promise}`);
				if (promise.startsWith("http")) {
					setMessage(promise);
				} else {
					function addTags(text) {
						const regex = /[\s]*```([^`]+)```[\s]*/g;
						return text.replace(regex, function (_, code) {
							return `<div class="border border-[#dddddd80] p-[20px] my-[30px] rounded-[10px]">${code}</div>`;
						});
					}
					setMessage(addTags(promise));
				}
				setPlaceholder(defaultPlaceholder);
			})
			.catch((error) => {
				console.error(error);
				setMessage(error.toString());
				setPlaceholder(errorPlaceholder);
			});
	}

	function handleInputChange(e) {
		setPrompt(e.target.value);
	}

	function handleKeyDown(e) {
		if (e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			setPrompt((prev) => prev + "\n");
			setRows(rows + 1);
		} else if (e.key === "Enter" && prompt !== "") {
			postMessage(prompt);
			setPrompt("");
			setPlaceholder(processingPlaceholder);
		}
	}

	return (
		<div
			id="chat"
			className="flex items-center justify-center flex-col w-full min-h-[95vh]"
		>
			{message.startsWith("http") ? (
				<img src={message} alt="DALL-E 3 image" className="max-h-[80%]" />
			) : (
				<div
					className={`text-[#dddddd] text-[16px] text-left tracking-[1px] max-w-[800px] py-[60px] ${roboto_mono.className}`}
				>
					<pre>
						<div dangerouslySetInnerHTML={{ __html: message }} />
					</pre>
				</div>
			)}
			<div className="flex flex-col items-center justify-center fixed inset-x-0 bottom-[13px]">
				{rows >= 2 && (
					<button
						onClick={() => setRows(1)}
						className={`flex items-center justify-center m-auto text-[12px] font-[200] mb-[10px] text-white  ${roboto_mono.className}`}
					>
						[ MINIMIZE ]
					</button>
				)}
				<textarea
					placeholder={placeholder}
					onFocus={(e) => (e.target.placeholder = "")}
					onBlur={(e) => (e.target.placeholder = placeholder)}
					value={prompt}
					disabled={placeholder === defaultPlaceholder ? false : true}
					onChange={(e) => handleInputChange(e)}
					onKeyDown={(e) => handleKeyDown(e)}
					rows={rows}
					className="text-white bg-[#000000ee] text-[12px] text-left px-[20px] py-[10px] w-[900px] max-[1000px]:w-[90vw] border border-[#ffffff80] rounded-[10px]"
				/>
			</div>
			<div className="flex h-[13px] w-full fixed bottom-0 bg-black" />
		</div>
	);
}
