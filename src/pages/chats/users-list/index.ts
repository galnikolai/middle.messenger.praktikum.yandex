import { Input } from '../../../components'
import { userController } from '../../../controllers/user-controller'

export const usersList = {
  inputSearch: new Input({
    placeholder: 'Search users',
    events: {
      change: (event: any) => {
        event.preventDefault()
        userController.searchUsers(event?.target?.value || '')
      },
    },
  }),
}
