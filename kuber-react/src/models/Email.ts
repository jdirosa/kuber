export interface IEmail {
  id: string;
  date: Date;
  from: string;
  domain: string;
  subject: string;
  read: boolean;
}
export interface ISentEmail {
  id: string;
  date: Date;
  to: string;
  subject: string;
}
