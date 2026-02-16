interface ConversationApplyPatchCallItemOperationBase {
    path: string;
    type: "create_file" | "delete_file" | "update_file";
}
export interface ConversationApplyPatchCallItemOperationCreate extends ConversationApplyPatchCallItemOperationBase {
    type: "create_file";
    diff: string;
}
export interface ConversationApplyPatchCallItemOperationDelete extends ConversationApplyPatchCallItemOperationBase {
    type: "delete_file";
}
export interface ConversationApplyPatchCallItemOperationUpdate extends ConversationApplyPatchCallItemOperationBase {
    type: "update_file";
    diff: string;
}
export {};
//# sourceMappingURL=ConversationApplyPatchCallItemOperation.d.ts.map