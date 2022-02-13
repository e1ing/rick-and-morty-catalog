import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'

export type LocationType = {
    id: number | null
    name: string
    type: string
    dimension: string
    residents: Array<string>
    url: string
}

const initialState: LocationType = {
    id: null,
    name: "",
    type: "",
    dimension: "",
    residents: [],
    url: "string"
}

type CharacterActionsType =
    | ReturnType<typeof setSingleLocationAC>
    | SetErrorAT
    | SetStatusAT

export const locationReducer = (
    state: LocationType = initialState,
    action: CharacterActionsType
): LocationType => {
    switch (action.type) {
        case 'SET-SINGLE-LOCATION':
            return action.location
        default:
            return state
    }
}

// action creators
export const setSingleLocationAC = (location: LocationType) =>
    ({type: 'SET-SINGLE-LOCATION', location} as const)

// thunk creators
export const fetchSingleLocationTC = (id: number) => {
    return (dispatch: Dispatch<CharacterActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleLocation(id)
            .then((res) => {
                dispatch(setSingleLocationAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}
