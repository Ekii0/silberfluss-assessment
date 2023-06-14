import { AbstractNode } from "./abstract-node";
import { PromptNode } from "./prompt-node";

export const allNodes: {[key: string]: typeof PromptNode} = {
  PromptNode
};