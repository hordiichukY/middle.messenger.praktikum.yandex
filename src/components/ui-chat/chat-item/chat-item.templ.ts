import chatItemTmpl from './chat-item.hbs';
import Block from '../../../core/Block';
import { URLS } from '../../../variables/api';

export type ChatItemProps = {
  resoursePath?: string;
  avatar: string;
  created_by?: number;
  id: number;
  title: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
  events?: {
    click?: (event: Event) => void;
  };
  class?: string;
};

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
    this.props.resoursePath = `${URLS.RESOURCES_URL}`;
  }
  render() {
    return this.compile(chatItemTmpl, { ...this.props });
  }
}
