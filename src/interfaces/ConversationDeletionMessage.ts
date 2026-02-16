export interface ConversationDeletionMessage {
	id: string,
	object: "conversation.deleted",
	deleted: boolean
};