import Handlebars from 'handlebars';
import serverErrorPageTmpl from './server-error.hbs';
import { InfoPage } from '../../components/info';

const serverErrorPageData = {
  title: '500',
  text: 'Oops, something went wrong',
};

export const getServerErrorPageHTML = () => {
  Handlebars.registerPartial('serverError', InfoPage(serverErrorPageData));

  return serverErrorPageTmpl();
};
