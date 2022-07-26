import chatNavTmpl from './chat-nav.hbs';
import { Link } from '../../link';
import Block from '../../../core/Block';
import { withRouter } from '../../../core/withRouter';
import { navigation } from '../../../variables/navigation';
import { Router } from '../../../core/Router';
import { Button } from '../../button';
import { Modal } from '../../modal';
import { createChatInputProps } from '../../../variables/chat-variables';

type ChatNavProps = {
  router: Router;
  hasModal: string;
};
class ChatNav extends Block<ChatNavProps> {
  constructor(props: ChatNavProps) {
    super(props);
  }

  openModal() {
    if (!(this.children.newChatModal instanceof Block)) {
      return;
    }
    this.children.newChatModal.setProps({ isShown: true });
  }

  initChildren(): void {
    this.children.link = new Link({
      class: 'link chat-nav__link',
      title: 'Profile',
      events: {
        click: () => this.props.router.go(navigation.settings.pathname),
      },
    });

    this.children.newChatBtn = new Button({
      class: 'chat-nav__btn',
      type: 'button',
      events: {
        click: () => {
          this.openModal();
        },
      },
    });

    this.children.newChatModal = new Modal({
      title: 'Create chat',
      buttonProps: {
        title: 'Create',
      },
      linkProps: {
        title: 'Cancel',
      },
      inputProps: {
        ...createChatInputProps,
      },
      isShown: false,
      action: 'create-chat',
    });
  }

  render() {
    return this.compile(chatNavTmpl, { ...this.props });
  }
}

export default withRouter(ChatNav);
