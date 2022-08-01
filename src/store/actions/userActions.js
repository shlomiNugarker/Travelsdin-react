import { userService } from '../../services/user/userService'

export function getUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'GET_USERS', users })
    } catch (err) {
      console.log('cannot get users:', err)
    }
  }
}
export function login(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCred)
      dispatch({ type: 'LOGIN', user })
    } catch (err) {
      console.log("can't do login:", err)
    }
  }
}
export function getLoggedinUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser()
      dispatch({ type: 'GET_LOGGEDIN_USER', user })
    } catch (err) {
      console.log('cannot getLoggedinUser:', err)
    }
  }
}
export function signup(userCred) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCred)
      dispatch({ type: 'SIGNUP', user })
    } catch (err) {
      console.log('cannot signup:', err)
    }
  }
}
export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'LOGOUT' })
    } catch (err) {
      console.log('cannot logout:', err)
    }
  }
}

export function updateUser(user) {
  return async (dispatch) => {
    await userService.update(user)
    dispatch({ type: 'UPDATE_USER', user })
  }
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId)
      dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
      console.log('cannot remove user', err)
    }
  }
}

export function getById(userId) {
  return async (dispatch) => {
    try {
      const user = await userService.getById(userId)
      // dispatch({ type: 'GET_BY_ID', userId })
    } catch (err) {
      console.log('cannot getByIdL:', err)
    }
  }
}