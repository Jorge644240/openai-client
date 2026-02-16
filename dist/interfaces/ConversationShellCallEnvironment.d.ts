interface ConversationShellCallEnvironmentBase {
    type: "local" | "container_reference";
}
export interface ConversationShellCallEnvironmentLocal extends ConversationShellCallEnvironmentBase {
    type: "local";
    skills?: Array<{
        description: string;
        name: string;
        path: string;
    }>;
}
export interface ConversationShellCallEnvironmentContainer extends ConversationShellCallEnvironmentBase {
    type: "container_reference";
    container_id: string;
}
export {};
//# sourceMappingURL=ConversationShellCallEnvironment.d.ts.map