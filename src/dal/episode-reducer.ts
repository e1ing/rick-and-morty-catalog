import {rickAndMortyApi} from '../api/api'
import {Dispatch} from 'redux'
import {setErrorAC, SetErrorAT, setStatusAC, SetStatusAT} from './app-reducer'
import {Debugger} from "inspector";

export type EpisodeType = {
    id: number | null
    name: string
    air_date: string
    episode: string
    characters: Array<string>
}

const initialState: EpisodeType = {
    id: null,
    name: "",
    air_date: "",
    episode: "",
    characters: []
}

export type EpisodeActionsType =
    | ReturnType<typeof setSingleEpisodeAC>
    | SetErrorAT
    | SetStatusAT

export const episodeReducer = (state: EpisodeType = initialState, action: EpisodeActionsType): EpisodeType => {
    switch (action.type) {
        case 'SET-SINGLE-EPISODE':
            return action.episode
        default:
            return state
    }
}

// action creators
export const setSingleEpisodeAC = (episode: EpisodeType) =>
    ({type: 'SET-SINGLE-EPISODE', episode} as const)

// thunk creators
export const fetchSingleEpisodeTC = (episode_id: number) => {
    return (dispatch: Dispatch<EpisodeActionsType>) => {
        dispatch(setStatusAC('loading'))
        rickAndMortyApi.getSingleEpisode(episode_id)
            .then((res) => {
                dispatch(setSingleEpisodeAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(error => {
                dispatch(setErrorAC(error))
            })
    }
}
