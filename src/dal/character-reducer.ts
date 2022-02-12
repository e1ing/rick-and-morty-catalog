import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'

export type CharacterType = {
    id: number|null
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
        url: string
    }
    episode: Array<string>
    image: string
}

const initialState: CharacterType = {
    id: null,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
        name: ""
    },
    location: {
        name: "",
        url: ""
    },
    episode: [],
    image: ""
}

type CharacterActionsType =
    | ReturnType<typeof setSingleCharacterAC>
    | SetErrorAT
    | SetStatusAT

export const characterReducer = (state: CharacterType = initialState,action: CharacterActionsType): CharacterType => {
    switch (action.type) {
        case 'SET-SINGLE-CHARACTER':
           return action.character
        default:
            return state
    }
}

// action creators
const setSingleCharacterAC = (character: CharacterType) =>({type: 'SET-SINGLE-CHARACTER', character} as const)

// thunk creators
export const fetchSingleCharacterTC = (id: number) => {
    return (dispatch: Dispatch<CharacterActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleCharacter(id).then((res) => {
            dispatch(setSingleCharacterAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
    }
}
