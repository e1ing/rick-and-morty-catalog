import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'
import {CharacterType} from "./character-reducer";

const initialState: Array<CharacterType> = []

export type CharactersActionsType =
    | ReturnType<typeof setMultipleCharactersAC>
    | SetErrorAT
    | SetStatusAT

export const charactersReducer = (
    state: Array<CharacterType> = initialState,
    action: CharactersActionsType
): Array<CharacterType> => {
    switch (action.type) {
        case 'SET-MULTIPLE-CHARACTERS':
            return action.characters
        default:
            return state;
    }
}

// action creators
export const setMultipleCharactersAC = (characters: Array<CharacterType>) =>
    ({type: 'SET-MULTIPLE-CHARACTERS', characters} as const)

// thunk creators
export const fetchMultipleCharactersTC = (id: Array<number>) => {
    return (dispatch: Dispatch<CharactersActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getMultipleCharacter(id)
            .then((res) => {
            dispatch(setMultipleCharactersAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}
