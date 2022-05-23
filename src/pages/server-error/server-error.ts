import serverErrorPageTmpl from './server-error.hbs';
import { InfoPage } from '../../components/info';
import Block from '../../utils/block';

export class ServerError extends Block {
  initChildren(): void {
    this.children.serverError = new InfoPage({
      title: '500',
      text: 'Oops, something went wrong',
    })
  }
  render() {
    return this.compile(serverErrorPageTmpl,{})
  }
}

