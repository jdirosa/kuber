export interface ISendMail {
  from: string;
  to: IRecipient[];
  subject: string;
  text?: string;
  html?: string;
  sentDate: Date;
}

export interface IRecipient {
  name?: string;
  email: string;
}
