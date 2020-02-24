import { IRecipient } from "../../../commonModels";

export function formatRecipients(to: IRecipient[]) {
  const tos = to.map(t => {
    if (t.name) {
      return `${t.name} <${t.email}>`;
    }
    return `<${t.email}>`;
  });
  return tos.join(", ");
}
