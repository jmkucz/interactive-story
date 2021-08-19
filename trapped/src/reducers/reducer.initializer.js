export const initialReducer = (defaultState, events) => {
    return (state = defaultState, action) =>
        events[action?.type] ? events[action.type](state, action) : state
}