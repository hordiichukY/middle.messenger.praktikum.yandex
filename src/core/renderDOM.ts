import Block from './Block';

export function renderDOM(component: Block) {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root not found');
  }
  root.innerHTML = '';
  root.append(component.getContent());
  return root;
}
