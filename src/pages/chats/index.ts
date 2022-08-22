import { ChatsPageBlock } from './chats.tmpl';
import { withStore } from '../../core/Store';
import Block from '../../core/Block';

export const ChatsPage = withStore((state) => ({ ...state }))(
  ChatsPageBlock as typeof Block
);
