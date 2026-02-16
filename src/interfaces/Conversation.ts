export interface Conversation {
	id: string,
	created_at: number,
	object: "conversation",
	metadata?: Record<string, string>
};