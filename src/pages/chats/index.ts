import { ChatsPageBlock } from './chats.tmpl';
import { withStore } from '../../core/Store';
import Block from '../../core/Block';

const ChatsPage = withStore((state) => ({ ...state }))(
  ChatsPageBlock as typeof Block
);

export default ChatsPage;
