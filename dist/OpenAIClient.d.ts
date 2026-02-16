import { type Conversation } from "./interfaces/Conversation.js";
import type { ConversationDeletionMessage } from "./interfaces/ConversationDeletionMessage.js";
import type { ConversationItemsResponse } from "./interfaces/ConversationItemsResponse.js";
import type { ConversationItem } from "./types/ConversationItem.js";
import type { ConversationItemsInclude } from "./types/ConversationItemsInclude.js";
import type { CreateConversationItem } from "./types/CreateConversationItem.js";
export default class OpenAIClient {
    #private;
    /**
     *
     * @param {object} config - Config options for OpenAIClient
     * @param {string} config.apiKey - Your OpenAI API Key
     * @param {string} [config.defaultTextModel="gpt-5.2-chat-latest"] - Default model for text prompts. Defaults to "gpt-5.2-chat-latest"
     * @param {string} [config.defaultImageModel="gpt-image-1"] - Default model for image prompts. Defaults to "gpt-image-1"
     * @param {string} [config.defaultVideoModel="sora-2"] - Default model for video prompts. Defaults to "sora-2"
     */
    constructor(config: {
        apiKey: string;
        defaultTextModel?: string;
        defaultImageModel?: string;
        defaultVideoModel?: string;
    });
    /**
     *
     * @param {object} conversationData - An object containing a maximum of 16 key-value pairs to add as metadata to the conversation (e.g. name, tags, userId)
     * @returns {Promise<Conversation>}
     */
    createConversation(conversationData: Record<string, string>): Promise<Conversation>;
    getConversation(conversationId: string): Promise<Conversation>;
    updateConversation(conversationId: string, conversationData: Record<string, string>): Promise<Conversation>;
    deleteConversation(conversationId: string, deleteItems?: boolean): Promise<ConversationDeletionMessage>;
    listConversationItems(conversationId: string, after?: string, include?: ConversationItemsInclude, limit?: number, order?: "asc" | "desc", returnType?: "raw" | "list"): Promise<ConversationItemsResponse | Array<ConversationItem>>;
    getConversationItem(conversationId: string, itemId: string, include?: ConversationItemsInclude): Promise<ConversationItem>;
    deleteConversationItem(conversationId: string, itemId: string): Promise<Conversation>;
    createConversationItems(conversationId: string, items: Array<CreateConversationItem>, include?: ConversationItemsInclude, returnType?: "raw" | "list"): Promise<ConversationItemsResponse | Array<ConversationItem>>;
}
//# sourceMappingURL=OpenAIClient.d.ts.map