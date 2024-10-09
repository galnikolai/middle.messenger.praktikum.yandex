import { User } from '../api/auth-api'
import { ChatInfo } from '../api/chats-api'
import { Password } from '../api/user-api'
import { set } from '../utils/api'
import Block from './Block'
import EventBus from './EventBus'

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user?: User
  chats?: ChatInfo[]
  messages?: any
  // Record<number, Message[]>;
  users?: Record<number, User[]>
  selectedChatUsers?: Record<number, User[]>
  selectedChat?: number
  password?: Password
  chatToken?: string
}

class Store extends EventBus {
  private state: State = {}

  public getState(): State {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)
    this.emit(StoreEvents.Updated, this.getState())
  }
}

export const store = new Store()

export function withStore(mapStateToProps: (state: State) => State) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: any) {
        let previousState: State = mapStateToProps(store.getState())

        super({ ...props, ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps: State = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}
