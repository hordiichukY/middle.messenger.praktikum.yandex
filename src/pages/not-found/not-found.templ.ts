import notFoundPageTmpl from './not-found.hbs';
import { InfoPage } from '../../components/info';
import Block from '../../core/Block';

export class NotFoundPage extends Block {
  initChildren(): void {
    this.children.notFound = new InfoPage({
      title: '404',
      text: 'Page not found',
    });
  }
  render() {
    return this.compile(notFoundPageTmpl, {});
  }
}
