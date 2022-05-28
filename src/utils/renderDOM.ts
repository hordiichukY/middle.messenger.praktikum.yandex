import Block from './block'

export function renderDOM(rootSelector: string, component: Block) {
  const root = document.getElementById(rootSelector);
  if(!root) {
    throw new Error('Root not found')
  }
  root.innerHTML = '';
  root.append(component.getContent())
  return root;
}