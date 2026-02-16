interface ConversationWebSearchToolCallItemActionBase {
	type: "search" | "open_page" | "find_in_page"
};

export interface ConversationWebSearchToolCallItemActionSearch extends ConversationWebSearchToolCallItemActionBase {
	query?: string,
	queries?: Array<string>,
	sources?: Array<{
		type: "url",
		url: string
	}>,
	type: "search"
};

export interface ConversationWebSearchToolCallItemActionOpenPage extends ConversationWebSearchToolCallItemActionBase {
	url: string,
	type: "open_page"
};

export interface ConversationWebSearchToolCallItemActionFind extends ConversationWebSearchToolCallItemActionBase {
	url: string,
	pattern: string,
	type: "find_in_page"
};