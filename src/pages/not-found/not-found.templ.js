import Handlebars from 'handlebars';
import notFoundPageTmpl from './not-found.hbs';
import { InfoPage } from '../../components/info';

const notFoundPageData = {
  title: '404',
  text: 'Page not found',
};

export const getNotFoundPageHTML = () => {
  Handlebars.registerPartial('notFound', InfoPage(notFoundPageData));

  return notFoundPageTmpl();
};
