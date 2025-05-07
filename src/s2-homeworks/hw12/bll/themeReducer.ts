const initState = {
    themeId: 1,
}

export const themeReducer = (state = initState, action: themeActionType): typeof initState => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID': {
            return {...state, themeId: action.id}
        }

        default:
            return state
    }
}

type themeActionType = {
    type: 'SET_THEME_ID'
    id: number
}

export const changeThemeId = (id: number): themeActionType => ({
    type: 'SET_THEME_ID',
    id
}) // fix any
