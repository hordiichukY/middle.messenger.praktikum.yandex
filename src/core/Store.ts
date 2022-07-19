import { EventBus } from './EventBus'
import { set } from '../utils/set'
import { StoreData } from '../utils/types/store'
import { isEqual } from '../utils/isEqual'
import Block from './Block'

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: StoreData = {}
  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

const store = new Store()

export default store

export const withStore =
  (mapToStateProps: (state: StoreData) => Record<string, unknown>) =>
  (Component: typeof Block) => {
    let state: Record<string, unknown>
    return class extends Component {
      constructor(props: Record<string, unknown>) {
        state = mapToStateProps(store.getState())

        super({ ...props, ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapToStateProps(store.getState())
          if (!isEqual(state, newState)) {
            this.setProps({
              ...newState,
            })
          }
        })
      }
    }
  }
