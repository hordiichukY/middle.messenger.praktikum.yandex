import Router from './Router'
import Block from './Block'

export function withRouter(Component: any) {
  return class WithRouter extends Component {
    public static componentName = Component.name

    constructor(props: any) {
      super({ ...props, router: Router })
    }
  }
}
