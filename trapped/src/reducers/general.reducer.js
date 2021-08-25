export const loginActionTypes = {
    loginExisting: "LOGIN",
    loginNew: "LOGIN_NEW",
    typingExisting: "TYPING_EXISTING",
    typingNew: "TYPING_NEW",
    isNew: "NEW_USER",
    falling: "FALLING"
}

export const homeActionTypes = {
    dialogueClick1: "DIALOGUE_CLICK1",
    nameEntered: "ENTERED_NAME",
    typingName: "TYPING_NAME"
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
        case loginActionTypes.falling: {
            return {
                ...state,
                falling: true,
                unClicked: false
            }
        }
        case homeActionTypes.dialogueClick1: {
            return {
                ...state,
                click1: action.click
            }
        }
        case homeActionTypes.typingName: {
            return {
                ...state,
                fullName: action.name
            }
        }
        case homeActionTypes.nameEntered: {
            return {
                ...state,
                nameEnter: true
            }
        }
        default: {
            return state
        }
    }
}

export default generalReducer