import { AbstractNode } from "./abstract-node";

export class SignatureNode extends AbstractNode {

  defaultConfig: { [key: string]: any; } = {
    text: ''
  };

  override _identifier = "signatureNode";

  async execute(): Promise<void> {
    const resp = await this.prompt(this.config?.['text'], '', );
    if (this.refId) {
      this.message?.set(this.refId, resp);
    }
  }

}
