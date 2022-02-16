import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { appReducer } from './app-reducer'
import {CharacterActionsType, characterReducer} from './character-reducer'
import {CharactersActionsType, charactersReducer} from './characters-reducer'
import {EpisodeActionsType, episodeReducer} from './episode-reducer'
import {EpisodesActionsType, episodesReducer } from './episodes-reducer'
import {LocationActionsType, locationReducer} from './location-reducer'
import {allEpisodesReducer} from "./all-episodes-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  episodes: episodesReducer,
  episode: episodeReducer,
  allEpisodes: allEpisodesReducer,
  character: characterReducer,
  characters: charactersReducer,
  location: locationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    EpisodesActionsType
    |LocationActionsType
    |CharacterActionsType
    |CharactersActionsType
    |EpisodeActionsType

