import linkTmpl from './link.hbs';
import Block from '../../utils/block';

export type LinkProps = {
  class?: string, 
  href: string, 
  title: string, 
  events?: {
    click: () => void; 
  }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props)
  }

  render () {
    return this.compile(linkTmpl, {...this.props})
  }
}
