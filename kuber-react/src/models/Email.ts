export interface IEmail {
  id: string;
  date: Date;
  from: string;
  domain: string;
  subject: string;
  read: boolean;
}
