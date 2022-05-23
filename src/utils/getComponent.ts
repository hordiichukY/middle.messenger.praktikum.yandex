import { routes, notFoundPageRoute } from './routes';

const currentRoute = routes.find((route) => {
  return route['url'] === window.location.pathname;
});

const notFoundPage = notFoundPageRoute;

export const getComponent = () => {
  if (currentRoute) {
    return currentRoute.renderFunc();  
  }

  window.location.pathname = '/404';
  return notFoundPage.renderFunc();
};
