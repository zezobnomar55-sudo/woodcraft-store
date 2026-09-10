export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isTestimonial?: boolean;
  status?: string;
  createdAt?: string;
}

export interface IMessagesRes {
  message: string;
  data: IMessage[];
}
