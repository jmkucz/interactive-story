export const loginActionTypes = {
    loginExisting: "LOGIN",
    loginNew: "LOGIN_NEW",
    typingExisting: "TYPING_EXISTING",
    typingNew: "TYPING_NEW",
    isNew: "NEW_USER",
}

export const homeActionTypes = {
    dialogueClick1: "DIALOGUE_CLICK1",
}

function generalReducer (state, action) {
    switch(action.type){
        case loginActionTypes.loginExisting: {
            return {
                ...state,
                authentic: action.authentic,
                fullName: action.fullName,
                baseState: action.baseState,
                username: action.username
            }
        }
    
        case loginActionTypes.loginNew: {
            return {
                ...state,
                alreadyExists: action.alreadyExists,
                username: action.username
            }
        }
        case loginActionTypes.typingExisting: {
            return {
                ...state,
                usernameInput: action.input,
            }
        }
        case loginActionTypes.typingNew: {
            return {
                ...state,
                newUsernameInput: action.input,
            }
        }
        case loginActionTypes.isNew: {
            return {
                ...state,
                username: action.username,
                authentic: true,
                baseState: 0,
            }
        }
        case homeActionTypes.dialogueClick1: {
            return {
                ...state,
                click1: action.click
            }
        }
        default: {
            return state
        }
    }
}

export default generalReducer