import type { ContainerFileCitation } from "../types/ContainerFileCitation.js";
import type { ConversationMessageItemContentType } from "../types/ConversationMessageItemContentType.js";
import type { FileCitation } from "../types/FileCitation.js";
import type { FilePath } from "../types/FilePath.js";
import type { URLCitation } from "../types/URLCitation.js";
import type { ConversationMessageItemLogProb } from "./ConversationMessageItemLogProb.js";

interface ConversationMessageItemContentBase {
	type: ConversationMessageItemContentType
}

export interface ConversationMessageItemContentInput extends ConversationMessageItemContentBase {
	type: "input_text",
	text: string
};

export interface ConversationMessageItemContentOutput extends ConversationMessageItemContentBase {
	type: "output_text",
	text: string,
	annotations: Array<FileCitation | URLCitation | ContainerFileCitation | FilePath> | FileCitation | URLCitation | ContainerFileCitation | FilePath,
	logprobs: Array<ConversationMessageItemLogProb>
};

export interface ConversationMessageItemContentText extends ConversationMessageItemContentBase {
	type: "text",
	text: string
};

export interface ConversationMessageItemContentSummary extends ConversationMessageItemContentBase {
	type: "summary_text",
	text: string
};

export interface ConversationMessageItemContentReasoning extends ConversationMessageItemContentBase {
	type: "reasoning_text",
	text: string
};

export interface ConversationMessageItemContentRefusal extends ConversationMessageItemContentBase {
	type: "refusal",
	refusal: string
};

export interface ConversationMessageItemContentInputImage extends ConversationMessageItemContentBase {
	type: "input_image",
	file_id?: string,
	image_url?: string,
	detail: "high" | "low" | "auto"
};

export interface ConversationMessageItemContentComputerScreenshot extends ConversationMessageItemContentBase {
	type: "computer_screenshot",
	file_id: string,
	image_url: string
};

export interface ConversationMessageItemContentInputFile extends ConversationMessageItemContentBase {
	type: "input_file",
	file_id?: string,
	file_url?: string,
	file_data?: string,
	filename?: string
};