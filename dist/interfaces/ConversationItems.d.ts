import type { ConversationItemType } from "../types/ConversationItemType.js";
import type { ConversationMessageItemContent } from "../types/ConversationMessageItemContent.js";
import type { ConversationApplyPatchCallItemOperationCreate, ConversationApplyPatchCallItemOperationDelete, ConversationApplyPatchCallItemOperationUpdate } from "./ConversationApplyPatchCallItemOperation.js";
import type { ConversationCodeInterpreterToolCallItemOutputImage, ConversationCodeInterpreterToolCallItemOutputLogs } from "./ConversationCodeInterpreterToolCallItemOutput.js";
import type { ConversationComputerToolCallActionClick, ConversationComputerToolCallActionDoubleClick, ConversationComputerToolCallActionDrag, ConversationComputerToolCallActionKeyPress, ConversationComputerToolCallActionMove, ConversationComputerToolCallActionScreenshot, ConversationComputerToolCallActionScroll, ConversationComputerToolCallActionType, ConversationComputerToolCallActionWait } from "./ConversationComputerToolCallAction.js";
import type { ConversationFileSearchToolCallItemResults } from "./ConversationFileSearchToolCallItemResults.js";
import type { ConversationItemSafetyCheck } from "./ConversationItemSafetyCheck.js";
import type { ConversationMCPListToolsItemTool } from "./ConversationMCPListToolsItemTool.js";
import type { ConversationMessageItemContentInput, ConversationMessageItemContentInputFile, ConversationMessageItemContentInputImage, ConversationMessageItemContentOutput, ConversationMessageItemContentReasoning, ConversationMessageItemContentRefusal, ConversationMessageItemContentSummary } from "./ConversationMessageItemContent.js";
import type { ConversationShellCallEnvironmentContainer, ConversationShellCallEnvironmentLocal } from "./ConversationShellCallEnvironment.js";
import type { ConversationShellCallOutputOutcomeExit, ConversationShellCallOutputOutcomeTimeout } from "./ConversationShellCallOutputOutcome.js";
import type { ConversationWebSearchToolCallItemActionFind, ConversationWebSearchToolCallItemActionOpenPage, ConversationWebSearchToolCallItemActionSearch } from "./ConversationWebSearchToolCallItemAction.js";
interface ConversationItemBase {
    type?: ConversationItemType;
    id?: string;
    status?: "in_progress" | "completed" | "incomplete" | "interpreting" | "failed" | "searching" | "generating" | "calling";
}
export interface ConversationMessageItem extends ConversationItemBase {
    id: string;
    role: "unknown" | "user" | "assistant" | "system" | "critic" | "discriminator" | "developer" | "tool";
    content: Array<ConversationMessageItemContent>;
    type: "message";
}
export interface ConversationFunctionToolCallItem extends ConversationItemBase {
    id: string;
    name: string;
    arguments: string;
    call_id: string;
    type: "function_call";
    status: "in_progress" | "completed" | "incomplete";
}
export interface ConversationFunctionToolCallOutputItem extends ConversationItemBase {
    id: string;
    call_id: string;
    output: string | Array<ConversationMessageItemContentInput | ConversationMessageItemContentInputImage | ConversationMessageItemContentInputFile>;
    type: "function_call_output";
    status: "in_progress" | "completed" | "incomplete";
}
export interface ConversationFileSearchToolCallItem extends ConversationItemBase {
    id: string;
    queries: Array<string>;
    results?: Array<ConversationFileSearchToolCallItemResults>;
    type: "file_search_call";
    status: "in_progress" | "completed" | "incomplete" | "failed" | "searching";
}
export interface ConversationWebSearchToolCallItem extends ConversationItemBase {
    id: string;
    action: ConversationWebSearchToolCallItemActionSearch | ConversationWebSearchToolCallItemActionOpenPage | ConversationWebSearchToolCallItemActionFind;
    type: "web_search_call";
    status: "in_progress" | "completed" | "failed" | "searching";
}
export interface ConversationImageGenerationCallItem extends ConversationItemBase {
    id: string;
    result: string;
    type: "image_generation_call";
    status: "in_progress" | "completed" | "failed" | "generating";
}
export interface ConversationComputerToolCallItem extends ConversationItemBase {
    id: string;
    action: ConversationComputerToolCallActionClick | ConversationComputerToolCallActionDoubleClick | ConversationComputerToolCallActionDrag | ConversationComputerToolCallActionKeyPress | ConversationComputerToolCallActionMove | ConversationComputerToolCallActionScreenshot | ConversationComputerToolCallActionScroll | ConversationComputerToolCallActionType | ConversationComputerToolCallActionWait;
    call_id: string;
    pending_safety_checks: Array<ConversationItemSafetyCheck>;
    type: "computer_call";
    status?: "in_progress" | "completed" | "incomplete";
}
export interface ConversationComputerToolCallOutputItem extends ConversationItemBase {
    id: string;
    call_id: string;
    output: {
        type: "computer_screenshot";
        file_id?: string;
        image_url?: string;
    };
    acknowledged_safety_checks: Array<ConversationItemSafetyCheck>;
    type: "computer_call_output";
    status?: "in_progress" | "completed" | "incomplete";
}
export interface ConversationReasoningItem extends ConversationItemBase {
    id: string;
    summary: Array<ConversationMessageItemContentSummary>;
    content?: Array<ConversationMessageItemContentReasoning>;
    encrypted_content?: string;
    type: "reasoning";
    status?: "in_progress" | "completed" | "incomplete";
}
export interface ConversationCodeInterpreterToolCallItem extends ConversationItemBase {
    id: string;
    code: string | null;
    container_id: string;
    outputs: Array<ConversationCodeInterpreterToolCallItemOutputLogs | ConversationCodeInterpreterToolCallItemOutputImage> | ConversationCodeInterpreterToolCallItemOutputLogs | ConversationCodeInterpreterToolCallItemOutputImage | null;
    type: "code_interpreter_call";
    status: "in_progress" | "completed" | "incomplete" | "interpreting" | "failed";
}
export interface ConversationLocalShellCallItem extends ConversationItemBase {
    id: string;
    call_id: string;
    action: {
        command: Array<string>;
        env: Map<string, string>;
        type: "exec";
        timeout_ms?: number;
        user?: string;
        working_directory?: string;
    };
    type: "local_shell_call";
    status: "in_progress" | "completed" | "incomplete";
}
export interface ConversationLocalShellCallOutputItem extends ConversationItemBase {
    id: string;
    output: string;
    type: "local_shell_call_output";
    status: "in_progress" | "completed" | "incomplete";
}
export interface ConversationShellToolCallItem extends ConversationItemBase {
    id?: string;
    call_id: string;
    action: {
        commands: Array<string>;
        max_output_length?: number;
        timeout_ms?: number;
    };
    environment?: ConversationShellCallEnvironmentLocal | ConversationShellCallEnvironmentContainer;
    created_by?: string;
    type: "shell_call";
    status?: "in_progress" | "completed" | "incomplete";
}
export interface ConversationShellCallOutputItem extends ConversationItemBase {
    id?: string;
    call_id: string;
    max_output_length?: number;
    output: Array<{
        outcome: ConversationShellCallOutputOutcomeTimeout | ConversationShellCallOutputOutcomeExit;
        stderr: string;
        stdout: string;
        created_by?: string;
    }>;
    created_by?: string;
    type: "shell_call_output";
    status?: "in_progress" | "completed" | "incomplete";
}
export interface ConversationApplyPatchCallItem extends ConversationItemBase {
    id?: string;
    call_id: string;
    operation: ConversationApplyPatchCallItemOperationCreate | ConversationApplyPatchCallItemOperationDelete | ConversationApplyPatchCallItemOperationUpdate;
    created_by?: string;
    type: "apply_patch_call";
    status: "in_progress" | "completed";
}
export interface ConversationApplyPatchCallOutputItem extends ConversationItemBase {
    id?: string;
    call_id: string;
    output?: string;
    created_by?: string;
    type: "apply_patch_call_output";
    status: "completed" | "failed";
}
export interface ConversationMCPListToolsItem extends ConversationItemBase {
    id: string;
    server_label: string;
    tools: Array<ConversationMCPListToolsItemTool>;
    type: "mcp_list_tools";
    error?: string;
}
export interface ConversationMCPApprovalRequestItem extends ConversationItemBase {
    id: string;
    arguments: string;
    name: string;
    server_label: string;
    type: "mcp_approval_request";
}
export interface ConversationMCPApprovalResponseItem extends ConversationItemBase {
    id?: string;
    approval_request_id: string;
    approve: boolean;
    type: "mcp_approval_response";
    reason?: string;
}
export interface ConversationMCPCallItem extends ConversationItemBase {
    id: string;
    arguments: string;
    name: string;
    server_label: string;
    approval_request_id?: string;
    error?: string;
    output?: string;
    type: "mcp_call";
    status: "in_progress" | "completed" | "incomplete" | "failed" | "calling";
}
export interface ConversationCustomToolCallItem extends ConversationItemBase {
    call_id: string;
    input: string;
    name: string;
    type: "custom_tool_call";
}
export interface ConversationCustomToolCallOutputItem extends ConversationItemBase {
    call_id: string;
    output: string | Array<ConversationMessageItemContentInput | ConversationMessageItemContentInputImage | ConversationMessageItemContentInputFile>;
    type: "custom_tool_call_output";
}
export interface CreateConversationEasyInputMessageItem extends ConversationItemBase {
    content: string | Array<ConversationMessageItemContentInput | ConversationMessageItemContentInputImage | ConversationMessageItemContentInputFile>;
    role: "user" | "assistant" | "system" | "developer";
    type?: "message";
}
export interface CreateConversationMessageItem extends ConversationItemBase {
    content: Array<ConversationMessageItemContentInput | ConversationMessageItemContentInputImage | ConversationMessageItemContentInputFile>;
    role: "user" | "system" | "developer";
    status?: "in_progress" | "completed" | "incomplete";
    type?: "message";
}
export interface CreateConversationOutputMessageItem extends ConversationItemBase {
    id: string;
    content: Array<ConversationMessageItemContentOutput | ConversationMessageItemContentRefusal>;
    role: "assistant";
    status: "in_progress" | "completed" | "incomplete";
    type: "message";
}
export interface CreateConversationCompactionItem extends ConversationItemBase {
    id?: string;
    type: "compaction";
    encrypted_content: string;
}
export interface CreateConversationItemReferenceItem extends ConversationItemBase {
    id: string;
    type?: "item_reference";
}
export {};
//# sourceMappingURL=ConversationItems.d.ts.map