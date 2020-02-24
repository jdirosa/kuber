export interface ISendEmail {
  userId: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}
