interface ConversationShellCallOutputOutcomeBase {
    type: "timeout" | "exit";
}
export interface ConversationShellCallOutputOutcomeTimeout extends ConversationShellCallOutputOutcomeBase {
    type: "timeout";
}
export interface ConversationShellCallOutputOutcomeExit extends ConversationShellCallOutputOutcomeBase {
    type: "exit";
    exit_code: number;
}
export {};
//# sourceMappingURL=ConversationShellCallOutputOutcome.d.ts.map