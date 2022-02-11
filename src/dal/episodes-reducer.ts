import { EpisodeType, rickAndMortyApi } from '../api/api'
import { Dispatch } from 'redux'
import { SetErrorAT, setStatusAC, SetStatusAT } from './app-reducer'

const initialState: Array<EpisodeType> = []

type EpisodesActionsType =
  | ReturnType<typeof setEpisodesAC>
  | SetErrorAT
  | SetStatusAT

export const episodesReducer = (
  state: Array<EpisodeType> = initialState,
  action: EpisodesActionsType
): Array<EpisodeType> => {
  switch (action.type) {
    case 'SET-EPISODES':
      action.episodes.map((ep) => ({
        ...ep,
        filter: 'all',
        entityStatus: 'idle',
      }))
    default:
      return state
  }
}

// action creators
export const setEpisodesAC = (episodes: Array<EpisodeType>) =>
  ({ type: 'SET-EPISODES', episodes } as const)

// thunk creators

export const fetchEpisodesTC = () => {
  return (dispatch: Dispatch<EpisodesActionsType>) => {
    dispatch(setStatusAC('loading'))
    rickAndMortyApi.getEpisodes().then((res) => {
      dispatch(setEpisodesAC(res.data))
      dispatch(setStatusAC('succeeded'))
    })
  }
}
