import { TestBlock } from './test/testBlock';
import { expect } from 'chai';
import chai from 'chai';
import { Route } from '../Route';
import { JSDOM } from 'jsdom';
import { Router } from '../Router';
import spies from 'chai-spies';
chai.use(spies);

const tmpl = '<html><body><div id="root"></div></body></html>';
const { window } = new JSDOM(tmpl, {
  url: 'http://localhost',
});

describe('Router', () => {
  let routerInstance: Router;
  beforeEach(function () {
    global.document = window.document;
    global.window = window as any;

    if (window.document.defaultView) {
      global.DocumentFragment = window.document.defaultView.DocumentFragment;
    }
    routerInstance = new Router();
    routerInstance.use({ pathname: '/test', private: false }, TestBlock);
  });

  it('should return router instance by calling use', () => {
    expect(
      routerInstance.use({ pathname: '/test', private: false }, TestBlock)
    ).instanceOf(Router);
  });

  it('should render page by calling go', () => {
    routerInstance.go('/test');
    const element = document.getElementById('test');
    expect(element).to.not.be.null;
  });

  it('should call back function once', () => {
    const spy = chai.spy();
    window.history.back = spy;
    routerInstance.back();
    expect(spy).to.have.been.called.once;
  });

  it('should call forward function once', () => {
    const spy = chai.spy();
    window.history.forward = spy;
    routerInstance.forward();
    expect(spy).to.have.been.called.once;
  });

  it('should return route instance bu calling getRoute', () => {
    expect(routerInstance.getRoute('/test')).instanceOf(Route);
  });

  it('should throw error if route does not exist', () => {
    const fn = () => routerInstance.go('/somewhere');
    expect(fn).to.throw(Error, 'Route does not exist');
  });
});
