import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'

export type CharacterType = {
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
        name: string
    }
    location: {
        name: string
    }
}

const initialState: CharacterType = {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
        name: ""
    },
    location: {
        name: ""
    }
}

type CharacterActionsType =
    | ReturnType<typeof setCharacterAC>
    | SetErrorAT
    | SetStatusAT

export const characterReducer = (
    state: CharacterType = initialState,
    action: CharacterActionsType
): CharacterType => {
    switch (action.type) {
        case 'SET-CHARACTER':
            action.character
        default:
            return state
    }
}

// action creators
export const setCharacterAC = (character: CharacterType) =>
    ({type: 'SET-CHARACTER', character} as const)

// thunk creators
export const fetchCharacterTC = (id: number) => {
    return (dispatch: Dispatch<CharacterActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleCharacter(id).then((res) => {
            dispatch(setCharacterAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
    }
}
