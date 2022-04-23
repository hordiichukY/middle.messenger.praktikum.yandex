import { routes } from './routes';

let currentRoute = routes.find((route) => {
  return route['url'] === window.location.pathname;
});

let notFoundPage = routes.find((route) => route['url'] === '/404');

export const renderPage = () => {
  if (currentRoute) {
    return currentRoute.renderFunc();
  } else {
    window.location.pathname = '/404';
    return notFoundPage.renderFunc();
  }
};
