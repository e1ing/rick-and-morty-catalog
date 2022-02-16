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

const initialState: Array<EpisodeType> = []

export type EpisodesActionsType =
    | ReturnType<typeof setEpisodesAC>
    | SetErrorAT
    | SetStatusAT

export const episodesReducer = (
    state: Array<EpisodeType> = initialState,
    action: EpisodesActionsType
): Array<EpisodeType> => {
    switch (action.type) {
        case 'SET-EPISODES':
            return [...action.episodes]
        default:
            return state
    }
}

// action creators
export const setEpisodesAC = (episodes: Array<EpisodeType>) => ({
    type: 'SET-EPISODES', episodes
} as const)


// thunk creators



export const fetchMultipleEpisodesTC = (id: Array<number>) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getMultipleEpisodes(id)
            .then((res) => {
                dispatch(setEpisodesAC([...res.data]))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}

export const filterEpisodesTC = (search: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.filterEpisodes(search)
            .then((res) => {
                dispatch(setEpisodesAC(res.data.results))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}



