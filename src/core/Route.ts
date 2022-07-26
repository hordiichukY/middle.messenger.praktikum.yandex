import Block from './Block'
import { renderDOM } from './renderDOM'

export type BlockDerivedConstructor = { new (): Block }

export class Route {
  protected _block: Block | null = null
  protected _instance: Route

  constructor(
    protected _pathname: string,
    protected _blockConstructor: BlockDerivedConstructor
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockConstructor()
    }
    this._block.show()
    renderDOM(this._block)
  }
}
