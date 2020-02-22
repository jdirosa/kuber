import { gql } from "apollo-boost";
export const GET_EMAIL_HTML = gql`
  query($data: String!) {
    GetEmailHTML(data: $data) {
      bodyHtml
    }
  }
`;
