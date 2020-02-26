import { request } from "graphql-request";
import { IEmail } from "../models";
import { CreateEmailMutation } from "./mutations/CreateEmail";
import { gqlHost } from "./route";

export const saveEmail = async (email: IEmail) => {
  const userId = "1"; // TODO: Fix
  const mut = CreateEmailMutation(email, userId);

  const response = await request(gqlHost(), mut);
  return response;
};
