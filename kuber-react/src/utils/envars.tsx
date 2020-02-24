import { Envars } from "../constants";
export function getEnvar(envar: Envars) {
  const result = process.env[envar];
  if (!result || result === "") {
    throw new Error("Missing envar: " + envar);
  }
  return result;
}
