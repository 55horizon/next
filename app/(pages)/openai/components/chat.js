"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { roboto_mono } from "@/app/styles/fonts.js";
import secureLocalStorage from "react-secure-storage";
import database from "@/app/database.json";

export default function Chat() {
	const defaultPlaceholder = database.pages.openai.placeholder.default.text[0];
	const processingPlaceholder =
		database.pages.openai.placeholder.processing.text[0];
	const errorPlaceholder = database.pages.openai.placeholder.error.text[0];
	const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
	const [error, setError] = useState(false);
	const system = !secureLocalStorage.getItem("messages")
		? [
				{
					role: "system",
					content:
						"You are a helpful code assistant, part of a NextJS playground application."
				}
			]
		: secureLocalStorage.getItem("messages");
	const {
		messages,
		input,
		isLoading,
		setMessages,
		handleInputChange,
		handleSubmit
	} = useChat({
		api: "/openai/api",
		initialMessages: system,
		onError: handleError
	});
	const [row, setRow] = useState(1);
	const pageBottomRef = useRef(null);

	function handleError() {
		setError(true);
	}

	useEffect(() => {
		if (isLoading) {
			setPlaceholder(processingPlaceholder);
		} else {
			if (!error) {
				secureLocalStorage.setItem("messages", messages);
				setPlaceholder(defaultPlaceholder);
			} else {
				setMessages([{ role: "system", content: errorPlaceholder }]);
				setPlaceholder(errorPlaceholder);
			}
		}
	}, [isLoading]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	function addTags(text) {
		const regex = /```[\s]*[^\n]*\n([^`]+)```/g;
		return text.replace(regex, function (_, code) {
			return `<div class="border border-[#dddddd80] p-[20px] my-[30px] rounded-[10px]">${code}</div>`;
		});
	}

	function scrollToBottom() {
		pageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	function deleteMessages(e) {
		secureLocalStorage.clear();
	}

	return (
		<div
			id="chat"
			className="flex items-center mix-blend-exclusion justify-center flex-col min-h-[95vh]"
		>
			<ul className="py-[160px] w-full">
				{messages.map((m, index) => (
					<li key={index} className={`text-[#7F7F7F] ${roboto_mono.className}`}>
						{index !== 0 && (
							<div className="w-full h-[1px] bg-[#ffffff20] my-[100px]" />
						)}
						<div className="text-[10px] mb-[10px] px-[13px] uppercase tracking-[2px] max-w-[800px] m-auto">
							{m.role === "user"
								? "User"
								: index !== 0
									? "Assistant"
									: "System Settings"}
						</div>
						<pre>
							<div
								className="text-white max-w-[800px] px-[13px] m-auto"
								dangerouslySetInnerHTML={{ __html: addTags(m.content) }}
							/>
						</pre>
					</li>
				))}
			</ul>
			<div className="text-white flex flex-col items-center justify-center fixed inset-x-0 bottom-[13px] max-w-[1280px] m-auto">
				<form
					id="prompt"
					onSubmit={
						input.toUpperCase() !== "DELETE MESSAGES"
							? handleSubmit
							: deleteMessages
					}
					className="w-full px-[13px]"
				>
					{row >= 2 && (
						<button
							onClick={() => setRow(1)}
							className={`flex items-center justify-center m-auto text-[12px] font-[200] mb-[10px] text-white  ${roboto_mono.className}`}
						>
							[ MINIMIZE ]
						</button>
					)}
					<div className="border bg-[#000000ee] border-[#ffffff80]">
						<label className="flex">
							<textarea
								value={input}
								onChange={handleInputChange}
								placeholder={placeholder}
								disabled={isLoading ? true : false}
								rows={row}
								onKeyDown={(e) => {
									if (e.key === "Enter" && e.shiftKey) {
										e.preventDefault;
										if (row < 10) {
											setRow(row + 1);
										}
									} else if (e.key === "Enter") {
										e.preventDefault();
										document.getElementById("prompt").requestSubmit();
									}
								}}
								className={`text-white text-[12px] text-left px-[20px] py-[10px] w-full ${roboto_mono.className}`}
							/>
						</label>
					</div>
				</form>
			</div>
			<div ref={pageBottomRef} />
		</div>
	);
}
