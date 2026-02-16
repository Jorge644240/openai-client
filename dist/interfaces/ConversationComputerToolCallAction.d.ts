interface ConversationComputerToolCallActionBase {
    type: "click" | "double_click" | "drag" | "keypress" | "move" | "screenshot" | "scroll" | "type" | "wait";
}
export interface ConversationComputerToolCallActionClick extends ConversationComputerToolCallActionBase {
    button: "left" | "right" | "wheel" | "back" | "forward";
    x: number;
    y: number;
    type: "click";
}
export interface ConversationComputerToolCallActionDoubleClick extends ConversationComputerToolCallActionBase {
    x: number;
    y: number;
    type: "double_click";
}
export interface ConversationComputerToolCallActionDrag extends ConversationComputerToolCallActionBase {
    path: Array<{
        x: number;
        y: number;
    }>;
    type: "drag";
}
export interface ConversationComputerToolCallActionKeyPress extends ConversationComputerToolCallActionBase {
    keys: Array<string>;
    type: "keypress";
}
export interface ConversationComputerToolCallActionMove extends ConversationComputerToolCallActionBase {
    x: number;
    y: number;
    type: "move";
}
export interface ConversationComputerToolCallActionScreenshot extends ConversationComputerToolCallActionBase {
    type: "screenshot";
}
export interface ConversationComputerToolCallActionScroll extends ConversationComputerToolCallActionBase {
    x: number;
    y: number;
    scroll_x: number;
    scroll_y: number;
    type: "scroll";
}
export interface ConversationComputerToolCallActionType extends ConversationComputerToolCallActionBase {
    text: string;
    type: "type";
}
export interface ConversationComputerToolCallActionWait extends ConversationComputerToolCallActionBase {
    type: "wait";
}
export {};
//# sourceMappingURL=ConversationComputerToolCallAction.d.ts.map