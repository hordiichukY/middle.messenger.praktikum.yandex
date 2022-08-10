import { TestBlock } from './test/testBlock';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Block from '../Block';
import { renderDOM } from '../renderDOM';

const tmpl = '<html><body><div id="root"></div></body></html>';
const { window } = new JSDOM(tmpl, {
  url: 'http://localhost',
});

describe('Block', () => {
  let component: Block;
  before(function () {
    global.document = window.document;
    global.window = window as any;

    if (window.document.defaultView) {
      global.DocumentFragment = window.document.defaultView.DocumentFragment;
    }
    component = new TestBlock({ title: 'testTitle' });
    renderDOM(component);
  });

  it('should return HTMLElement by calling getContent', () => {
    expect(component.getContent().textContent).equals('testTitle');
  });

  it('should render block', () => {
    const element = document.getElementById('test');
    expect(element).to.be.not.null;
    expect(element?.textContent).equals('testTitle');
  });

  it('should re-render content after setting new props', () => {
    component.setProps({ title: 'newTitle' });
    const element = document.getElementById('test');
    expect(element).to.be.not.null;
    expect(element?.textContent).equals('newTitle');
  });
});
