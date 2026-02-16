import type { ConversationItem } from "../types/ConversationItem.js";

export interface ConversationItemsResponse {
	object: "list",
	first_id: string,
	last_id: string,
	hass_more: boolean,
	data: Array<ConversationItem>
};