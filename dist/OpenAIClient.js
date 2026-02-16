var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _OpenAIClient_config;
import {} from "./interfaces/Conversation.js";
class OpenAIClient {
    /**
     *
     * @param {object} config - Config options for OpenAIClient
     * @param {string} config.apiKey - Your OpenAI API Key
     * @param {string} [config.defaultTextModel="gpt-5.2-chat-latest"] - Default model for text prompts. Defaults to "gpt-5.2-chat-latest"
     * @param {string} [config.defaultImageModel="gpt-image-1"] - Default model for image prompts. Defaults to "gpt-image-1"
     * @param {string} [config.defaultVideoModel="sora-2"] - Default model for video prompts. Defaults to "sora-2"
     */
    constructor(config) {
        _OpenAIClient_config.set(this, void 0);
        if (!config.apiKey)
            throw new Error("Property 'apiKey' of 'config' must be a string");
        __classPrivateFieldSet(this, _OpenAIClient_config, {
            apiKey: config.apiKey,
            defaultModels: {
                text: config.defaultTextModel || "gpt-5.2-chat-latest",
                image: config.defaultImageModel || "gpt-image-1",
                video: config.defaultVideoModel || "sora-2"
            }
        }, "f");
    }
    /**
     *
     * @param {object} conversationData - An object containing a maximum of 16 key-value pairs to add as metadata to the conversation (e.g. name, tags, userId)
     * @returns {Promise<Conversation>}
     */
    createConversation(conversationData) {
        if (Object.keys(conversationData).length > 16)
            throw new Error("'conversationData' can contain a maximum of 16 key-value pairs");
        if (Object.keys(conversationData).some(k => k.length > 64))
            throw new Error("'conversationData' keys must be 64 characters or shorter");
        if (Object.values(conversationData).some(v => v.length > 512))
            throw new Error("'conversationData' values must be 512 characters or shorter");
        return new Promise((resolve, reject) => {
            fetch("https://api.openai.com/v1/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                },
                body: JSON.stringify({
                    metadata: conversationData
                })
            })
                .then(res => res.json())
                .then(res => {
                if (res.id && res.object && res.object === "conversation")
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    getConversation(conversationId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                }
            })
                .then(res => res.json())
                .then(res => {
                if (res.id && res.object && res.object === "conversation")
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    updateConversation(conversationId, conversationData) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                },
                body: JSON.stringify({
                    metadata: conversationData
                })
            })
                .then(res => res.json())
                .then(res => {
                if (res.id && res.object && res.object === "conversation")
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    deleteConversation(conversationId, deleteItems = false) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.openai.com/v1/conversations/${conversationId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                }
            })
                .then(res => res.json())
                .then(res => {
                if (res.id && res.object && res.object === "conversation.deleted" && res.deleted)
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    listConversationItems(conversationId, after, include, limit, order, returnType = "raw") {
        return new Promise((resolve, reject) => {
            const queryParams = new URLSearchParams();
            if (after)
                queryParams.set("after", after.toString());
            if (include?.length)
                queryParams.set("include", include.toString());
            if (limit && limit > 1 && limit < 100)
                queryParams.set("limit", limit.toString());
            if (order)
                queryParams.set("order", order);
            fetch(`https://api.openai.com/v1/conversations/${conversationId}/items?${queryParams.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                }
            })
                .then(res => res.json())
                .then(res => {
                if (res.object && res.object === "list" && res.data)
                    resolve(returnType === "raw" ? res : res.data);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    getConversationItem(conversationId, itemId, include) {
        return new Promise((resolve, reject) => {
            const queryParams = new URLSearchParams();
            if (include?.length)
                queryParams.set("include", include.toString());
            fetch(`https://api.openai.com/v1/conversations/${conversationId}/items/${itemId}?${queryParams.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                }
            })
                .then(res => res.json())
                .then(res => {
                if (res.type && ["message", "function_call", "function_call_output", "file_search_call", "web_search_call", "image_generation_call", "computer_call", "computer_call_output", "reasoning", "code_interpreter_call", "local_shell_call", "local_shell_call_output", "shell_call", "shell_call_output", "apply_patch_call", "apply_patch_call_output", "mcp_list_tools", "mcp_approval_request", "mcp_approval_response", "mcp_call", "custom_tool_call", "custom_tool_call_output"].includes(res.type))
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    deleteConversationItem(conversationId, itemId) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.openai.com/v1/conversations/${conversationId}}/items/${itemId}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(res => {
                if (res.id && res.object && res.object === "conversation")
                    resolve(res);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
    createConversationItems(conversationId, items, include, returnType = "raw") {
        return new Promise((resolve, reject) => {
            const queryParams = new URLSearchParams();
            if (include?.length)
                queryParams.set("include", include.toString());
            fetch(`https://api.openai.com/v1/conversations/${conversationId}/items?${queryParams.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${__classPrivateFieldGet(this, _OpenAIClient_config, "f").apiKey}`
                },
                body: JSON.stringify({
                    items
                })
            })
                .then(res => res.json())
                .then(res => {
                if (res.object && res.object === "list" && res.data)
                    resolve(returnType === "raw" ? res : res.data);
                else
                    reject(res);
            })
                .catch(reject);
        });
    }
}
_OpenAIClient_config = new WeakMap();
export default OpenAIClient;
;
//# sourceMappingURL=OpenAIClient.js.map