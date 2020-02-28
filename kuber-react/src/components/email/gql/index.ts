import { gql } from "apollo-boost";
export const GET_EMAIL_HTML = gql`
  query($data: String!) {
    GetEmailHTML(data: $data) {
      bodyHtml
      subject
      from {
        name
        address
      }
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation($data: SendEmail!) {
    SendEmail(data: $data) {
      id
      to
      date
      subject
    }
  }
`;
export const DELETE_EMAIL = gql`
  mutation($data: String!) {
    DeleteEmail(data: $data)
  }
`;
