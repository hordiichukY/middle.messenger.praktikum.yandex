import { HTTPTransport } from '../core/htttpTransport';
import { BaseAPI } from './BaseAPI';
import { API } from '../variables/api';
import {
  ChatAccessRequestBody,
  ChatAccessResponse,
  ChatCreationRequest,
  ChatCreationResponse,
  ChatsResponse,
  ChatTokenResponse,
} from '../utils/types/chatData';

const ChatsAPIInstance = new HTTPTransport(API.CHATS);
const defaultHeader = { 'Content-Type': 'application/json' };

export class ChatsAPI extends BaseAPI {
  getChats() {
    return ChatsAPIInstance.get<ChatsResponse>('/');
  }

  createChat(data: ChatCreationRequest) {
    return ChatsAPIInstance.post<ChatCreationResponse>('/', {
      headers: defaultHeader,
      data,
    });
  }

  addUser(data: ChatAccessRequestBody) {
    return ChatsAPIInstance.put<ChatAccessResponse>(API.USERS, {
      headers: defaultHeader,
      data,
    });
  }

  deleteUser(data: ChatAccessRequestBody) {
    return ChatsAPIInstance.delete<ChatAccessResponse>(API.USERS, {
      headers: defaultHeader,
      data,
    });
  }

  getChatToken(chatId: number) {
    return ChatsAPIInstance.post<ChatTokenResponse>(
      `${API.CHAT_ID_TOKEN}/${chatId}`
    );
  }

  create = undefined;
  request = undefined;
  update = undefined;
  delete = undefined;
}
