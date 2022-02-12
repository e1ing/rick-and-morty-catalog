import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'

export type LocationType = {
    id: number | null
    name: string
    type: string
    dimension: string
    residents: Array<string>
    url: string
    created: string
}

const initialState: LocationType = {
    id: null,
    name: "",
    type: "",
    dimension: "",
    residents: [],
    url: "string",
    created: ""
}

type CharacterActionsType =
    | ReturnType<typeof setSingleCharacterAC>
    | SetErrorAT
    | SetStatusAT

export const locationReducer = (
    state: LocationType = initialState,
    action: CharacterActionsType
): LocationType => {
    switch (action.type) {
        case 'SET-SINGLE-LOCATION':
            action.location
        default:
            return state
    }
}

// action creators
export const setSingleCharacterAC = (location: LocationType) =>
    ({type: 'SET-SINGLE-LOCATION', location} as const)

// thunk creators
export const fetchSingleLocationTC = (id: number) => {
    return (dispatch: Dispatch<CharacterActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleLocation(id).then((res) => {
            dispatch(setSingleCharacterAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
    }
}
