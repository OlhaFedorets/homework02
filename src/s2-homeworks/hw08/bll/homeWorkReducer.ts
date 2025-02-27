import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name

            action.payload === 'up'
                ? state = [...state].sort(function (a, b) {
                    return (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1))
                })
                : state = [...state].sort(function (a, b) {
                    return (a.name < b.name ? 1 : (a.name === b.name ? 0 : -1))
                }) // need to fix
            return state
        }
        case 'check': {

            return state.filter(el=>el.age > 17) // need to fix
        }
        default:
            return state
    }
}
