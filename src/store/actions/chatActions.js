import { chatService } from '../../services/chats/chatService'

export function loadChats(userId) {
  return async (dispatch, getState) => {
    try {
      // const { filterBy } = getState().postModule
      const filterBy = { userId }
      const chats = await chatService.query(filterBy)
      dispatch({ type: 'SET_CHATS', chats })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

// export function saveMessage(comment) {
//   return async (dispatch) => {
//     try {
//       const savedComment = await chatService.save(comment)
//       comment._id
//         ? dispatch({ type: 'UPDATE_COMMENT', comment: savedComment })
//         : dispatch({ type: 'ADD_COMMENT', comment: savedComment })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function loadChatsByUserId() {
//   return async (dispatch, getState) => {
//     try {
//       const { filterBy } = getState().chatModule
//       const chats = await chatService.query(filterBy)
//       dispatch({ type: 'ADD_CHATS', chats })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

export function saveChat(chat) {
  return async (dispatch) => {
    try {
      console.log(chat)
      const addedChat = await chatService.save(chat)
      chat._id
        ? dispatch({ type: 'UPDATE_CHAT', chat: addedChat })
        : dispatch({ type: 'ADD_CHAT', chat: addedChat })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

// export function removeChat(chatId) {
//   return async (dispatch) => {
//     try {
//       await chatService.remove(chatId)
//       dispatch({ type: 'REMOVE_CHAT', chatId })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }