import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { IMessage, IMessagesRes } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiURL = environment.apiURL + 'message';

  constructor(private _http: HttpClient) {}

  sendMessage(messageData: IMessage) {
    return this._http.post<{ message: string; data: IMessage }>(this.apiURL, messageData);
  }

  getTestimonials() {
    return this._http.get<IMessagesRes>(this.apiURL + '/testimonials');
  }

  getAllMessages() {
    return this._http.get<IMessagesRes>(this.apiURL + '/all');
  }
}
