import serverErrorPageTmpl from './server-error.hbs';
import { InfoPage } from '../../components/info';
import Block from '../../core/Block';

export class ServerError extends Block {
  initChildren(): void {
    this.children.serverError = new InfoPage({
      title: '500',
      text: 'Oops, something went wrong',
    });
  }
  render() {
    return this.compile(serverErrorPageTmpl, {});
  }
}
