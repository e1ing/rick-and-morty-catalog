import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'
import {toGetIds} from "../utils/toGetIds";
import {fetchMultipleEpisodesTC} from "./episodes-reducer";
import {AppActionsType, AppRootStateType} from "./store";
import {ThunkAction} from "redux-thunk";

export type CharacterType = {
    id: number | null
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

export type CharacterActionsType =
    | ReturnType<typeof setSingleCharacterAC>
    | SetErrorAT
    | SetStatusAT

export const characterReducer = (state: CharacterType = initialState, action: CharacterActionsType): CharacterType => {
    switch (action.type) {
        case 'SET-SINGLE-CHARACTER':
            return action.character
        default:
            return state
    }
}

// action creators
const setSingleCharacterAC = (character: CharacterType) => ({type: 'SET-SINGLE-CHARACTER', character} as const)

// thunk creators
export const fetchSingleCharacterTC = (id: number):ThunkAction<void, AppActionsType, unknown, AppActionsType> => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleCharacter(id)
            .then((res) => {
                dispatch(setSingleCharacterAC(res.data))
                const episodes_id = toGetIds(res.data.episode)
                dispatch(fetchMultipleEpisodesTC(episodes_id))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}
