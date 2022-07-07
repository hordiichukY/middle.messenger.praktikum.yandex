import { EventBus } from './EventBus'
import { nanoid } from 'nanoid'

type Events = Record<string, () => void>
type Cotnext = Record<string, unknown>
type TProps = Record<string, unknown>
type Children = Record<string, Block<TProps> | Block<TProps>[]>

class Block<TProps = Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  protected id: string
  protected _element: HTMLElement
  protected _meta: { props: TProps }
  protected children: Children = {}
  protected props: TProps
  protected eventBus: () => EventBus

  constructor(props: TProps | any = {}) {
    const eventBus = new EventBus()

    this.id = nanoid()

    this._meta = { props }
    this.props = this.makePropsProxy(props)

    this.initChildren()
    this.eventBus = () => eventBus
    this.registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  initChildren() {}

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount()
  }

  protected componentDidMount() {}

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: TProps, newProps: TProps) {
    if (oldProps !== newProps) {
      return true
    }
  }

  public setProps(nextProps: TProps) {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement {
    return this._element
  }

  private _render() {
    const fragment = this.render()
    const newElement = fragment.firstElementChild as HTMLElement

    this._element?.replaceWith(newElement)

    this._element = newElement

    this.addEvents()
  }

  protected render() {
    return new DocumentFragment()
  }

  public getContent() {
    return this.element
  }

  private makePropsProxy(props: any) {
    const self = this

    return new Proxy(props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target }
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)
        return true
      },
    })
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  private removeEvents() {
    const events: Events = (this.props as any).events as Events
    if (!events || !this._element) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element.removeEventListener(event, listener)
      }
    })
  }

  private addEvents() {
    const events: Events = (this.props as any).events as Events
    if (!events || !this._element) {
      return
    }

    Object.entries(events).forEach(([event, listener]) => {
      if (this._element) {
        this._element.addEventListener(event, listener)
      }
    })
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }

  protected compile(template: (context: Cotnext) => string, context: Cotnext) {
    const fragment = this.createDocumentElement(
      'template'
    ) as HTMLTemplateElement

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(
          (child) => `<div data-id="id-${child.id}"></div>`
        )
        return
      }

      context[key] = `<div data-id="id-${child.id}"></div>`
    })

    const htmlString = template(context)
    fragment.innerHTML = htmlString

    const replaceStubWithBlock = (block: Block<TProps>): void => {
      const stub = fragment.content.querySelector(`[data-id="id-${block.id}"]`)
      stub?.replaceWith(block.getContent())
    }

    Object.values(this.children).forEach((possibleBlock) => {
      if (!Array.isArray(possibleBlock)) {
        return replaceStubWithBlock(possibleBlock as any)
      }

      possibleBlock.forEach(replaceStubWithBlock as any)
    })

    return fragment.content
  }
}

export default Block
