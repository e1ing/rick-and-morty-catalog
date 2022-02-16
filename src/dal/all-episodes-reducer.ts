import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'
import {AppActionsType} from "./store";

export type EpisodeType = {
    id: number
    name: string
    air_date: string
    episode: string
    characters: Array<string>
    url: string
    created: string
}

export type AllEpisodesType = {
    info: {
        count: number
        pages: number
        next: string
        prev: string | null
    }
    episodes: Array<EpisodeType>
}

const initialState: AllEpisodesType = {
    info: {
        count: 51,
        pages: 1,
        next: "",
        prev: null
    },
    episodes: []
}

export type AllEpisodesActionsType =
    | ReturnType<typeof setEpisodesAC>
    | SetErrorAT
    | SetStatusAT

export const allEpisodesReducer = (
    state: AllEpisodesType = initialState,
    action: AllEpisodesActionsType
): AllEpisodesType => {
    switch (action.type) {
        case 'SET-EPISODES':
            return {...state, episodes: action.episodes}
        default:
            return state
    }
}

// action creators
export const setEpisodesAC = (episodes: Array<EpisodeType>) => ({
    type: 'SET-EPISODES', episodes
} as const)

// thunk creators
export const fetchEpisodesTC = (page: number) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getEpisodes(page)
            .then((res) => {
                dispatch(setEpisodesAC(res.data.results))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}





