import chatMsgTmpl from './chat-message.hbs';
import Block from '../../../core/Block';
import { ChatMessageProps } from '../../../utils/types/chatData';

type MessageProps = {
  message: ChatMessageProps;
  isCurrentUserMessage: boolean;
};

export class ChatMessage extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(chatMsgTmpl, { ...this.props });
  }
}
