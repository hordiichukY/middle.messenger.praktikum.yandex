import Block from '../../Block';
const testTmpl = (context: any) => `<div id='test'>${context.title}</div>`;

export class TestBlock extends Block {
  render() {
    return this.compile(testTmpl, { ...this.props });
  }
}
