import Block from './block'
import { isEqual } from './isEqual'
import { renderDOM } from './renderDOM'

type Props = {
  rootQuery: string
}

export type BlockDerivedConstructor = { new (): Block }

export class Route {
  protected _block: Block | null = null
  protected _instance: Route

  constructor(
    protected _pathname: string,
    protected _blockConstructor: BlockDerivedConstructor,
    protected _props: Props
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
    return isEqual(pathname, this._pathname)
  }

  render() {
    if (this._block) {
      this._block.show()
      return
    }
    this._block = new this._blockConstructor()
    renderDOM(this._props.rootQuery, this._block)
  }
}
