import linkTmpl from './link.hbs';
import Block from '../../core/Block';

export type LinkProps = {
  class?: string;
  title: string;
  events?: {
    click: () => void;
  };
};

export class Link extends Block<LinkProps> {
  render() {
    return this.compile(linkTmpl, { ...this.props });
  }
}
