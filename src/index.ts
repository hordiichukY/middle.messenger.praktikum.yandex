import {renderDOM} from './utils/renderDOM';
import { getComponent } from './utils/getComponent';

document.addEventListener('DOMContentLoaded', () => {
  const component = getComponent();
  renderDOM('root', component); 
})


