import * as Loadable from 'react-loadable'
import { Loading } from './loading'

export default Loading

export const async = (loader: () => any) => {
  return Loadable({
    loader: loader,
    loading: Loading,
    delay: 300,
    timeout: 5000,
  })
}
