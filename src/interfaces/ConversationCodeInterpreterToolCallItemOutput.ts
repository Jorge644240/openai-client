interface ConversationCodeInterpreterToolCallItemOutputBase {
	type: "logs" | "image"
};

export interface ConversationCodeInterpreterToolCallItemOutputLogs extends ConversationCodeInterpreterToolCallItemOutputBase {
	logs: string,
	type: "logs"
};

export interface ConversationCodeInterpreterToolCallItemOutputImage extends ConversationCodeInterpreterToolCallItemOutputBase {
	url: string,
	type: "image"
};