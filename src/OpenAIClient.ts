import { type Conversation } from "./interfaces/Conversation.js";
import type { ConversationDeletionMessage } from "./interfaces/ConversationDeletionMessage.js";
import type { ConversationItemsResponse } from "./interfaces/ConversationItemsResponse.js";
import type { ConversationItem } from "./types/ConversationItem.js";
import type { ConversationItemsInclude } from "./types/ConversationItemsInclude.js";
import type { CreateConversationItem } from "./types/CreateConversationItem.js";

export default class OpenAIClient {
	#config;
	/**
	 * 
	 * @param {object} config - Config options for OpenAIClient
	 * @param {string} config.apiKey - Your OpenAI API Key
	 * @param {string} [config.defaultTextModel="gpt-5.2-chat-latest"] - Default model for text prompts. Defaults to "gpt-5.2-chat-latest"
	 * @param {string} [config.defaultImageModel="gpt-image-1"] - Default model for image prompts. Defaults to "gpt-image-1"
	 * @param {string} [config.defaultVideoModel="sora-2"] - Default model for video prompts. Defaults to "sora-2"
	 */
	constructor(config: {
		apiKey: string,
		defaultTextModel?: string,
		defaultImageModel?: string,
		defaultVideoModel?: string
	}) {
		if (!config.apiKey) throw new Error("Property 'apiKey' of 'config' must be a string");
		this.#config = {
			apiKey: config.apiKey,
			defaultModels: {
				text: config.defaultTextModel || "gpt-5.2-chat-latest",
				image: config.defaultImageModel || "gpt-image-1",
				video: config.defaultVideoModel || "sora-2"
			}
		};
	}
	/**
	 * 
	 * @param {object} conversationData - An object containing a maximum of 16 key-value pairs to add as metadata to the conversation (e.g. name, tags, userId)
	 * @returns {Promise<Conversation>}
	 */
	createConversation(conversationData: Record<string, string>): Promise<Conversation> {
		if (Object.keys(conversationData).length > 16) throw new Error("'conversationData' can contain a maximum of 16 key-value pairs");
		if (Object.keys(conversationData).some(k => k.length>64)) throw new Error("'conversationData' keys must be 64 characters or shorter");
		if (Object.values(conversationData).some(v => v.length>512)) throw new Error("'conversationData' values must be 512 characters or shorter");
		return new Promise((resolve, reject) => {
			fetch("https://api.openai.com/v1/conversations", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.#config.apiKey}`
				},
				body: JSON.stringify({
					metadata: conversationData
				})
			})
			.then(res => res.json())
			.then(res => {
				if (res.id && res.object && res.object==="conversation") resolve(res);
				else reject(res)
			})
			.catch(reject);
		});
	}
	getConversation(conversationId: string): Promise<Conversation> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
				headers: {
					"Authorization": `Bearer ${this.#config.apiKey}`
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.id && res.object && res.object==="conversation") resolve(res);
				else reject(res)
			})
			.catch(reject);
		});
	}
	updateConversation(conversationId: string, conversationData: Record<string, string>): Promise<Conversation> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.#config.apiKey}`
				},
				body: JSON.stringify({
					metadata: conversationData
				})
			})
			.then(res => res.json())
			.then(res => {
				if (res.id && res.object && res.object==="conversation") resolve(res);
				else reject(res)
			})
			.catch(reject);
		});
	}
	deleteConversation(conversationId: string, deleteItems: boolean = false): Promise<ConversationDeletionMessage> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${this.#config.apiKey}`
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.id && res.object && res.object==="conversation.deleted" && res.deleted) resolve(res);
				else reject(res)
			})
			.catch(reject);
		});
	}
	listConversationItems(conversationId: string, after?: string, include?: ConversationItemsInclude, limit?: number, order?: "asc" | "desc", returnType: "raw" | "list" = "raw"): Promise<ConversationItemsResponse | Array<ConversationItem>> {
		return new Promise((resolve, reject) => {
			const queryParams = new URLSearchParams();
			if (after) queryParams.set("after", after.toString());
			if (include?.length) queryParams.set("include", include.toString());
			if (limit && limit>1 && limit<100) queryParams.set("limit", limit.toString());
			if (order) queryParams.set("order", order);
			fetch(`https://api.openai.com/v1/conversations/${conversationId}/items?${queryParams.toString()}`, {
				headers: {
					"Authorization": `Bearer ${this.#config.apiKey}`
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.object && res.object==="list" && res.data) resolve(returnType==="raw" ? res : res.data);
				else reject(res);
			})
			.catch(reject);
		});
	}
	getConversationItem(conversationId: string, itemId: string, include?: ConversationItemsInclude): Promise<ConversationItem> {
		return new Promise((resolve, reject) => {
			const queryParams = new URLSearchParams();
			if (include?.length) queryParams.set("include", include.toString());
			fetch(`https://api.openai.com/v1/conversations/${conversationId}/items/${itemId}?${queryParams.toString()}`, {
				headers: {
					"Authorization": `Bearer ${this.#config.apiKey}`
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.type && [ "message", "function_call", "function_call_output", "file_search_call", "web_search_call", "image_generation_call", "computer_call", "computer_call_output", "reasoning", "code_interpreter_call", "local_shell_call", "local_shell_call_output", "shell_call", "shell_call_output", "apply_patch_call", "apply_patch_call_output", "mcp_list_tools", "mcp_approval_request", "mcp_approval_response", "mcp_call", "custom_tool_call", "custom_tool_call_output" ].includes(res.type)) resolve(res);
				else reject(res);
			})
			.catch(reject);
		});
	}
	deleteConversationItem(conversationId: string, itemId: string): Promise<Conversation> {
		return new Promise((resolve, reject) => {
			fetch(`https://api.openai.com/v1/conversations/${conversationId}}/items/${itemId}`, {
				method: "DELETE"
			})
			.then(res => res.json())
			.then(res => {
				if (res.id && res.object && res.object==="conversation") resolve(res);
				else reject(res)
			})
			.catch(reject);
		});
	}
	createConversationItems(conversationId: string, items: Array<CreateConversationItem>, include?: ConversationItemsInclude, returnType: "raw" | "list" = "raw"): Promise<ConversationItemsResponse | Array<ConversationItem>> {
		return new Promise((resolve, reject) => {
			const queryParams = new URLSearchParams();
			if (include?.length) queryParams.set("include", include.toString());
			fetch(`https://api.openai.com/v1/conversations/${conversationId}/items?${queryParams.toString()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${this.#config.apiKey}`
				},
				body: JSON.stringify({
					items
				})
			})
			.then(res => res.json())
			.then(res => {
				if (res.object && res.object==="list" && res.data) resolve(returnType==="raw" ? res : res.data);
				else reject(res);
			})
			.catch(reject);
		})
	}
};