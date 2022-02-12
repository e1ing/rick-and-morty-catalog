import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { appReducer } from './app-reducer'
import { characterReducer } from './character-reducer'
import { charactersReducer } from './characters-reducer'
import { episodeReducer } from './episode-reducer'
import { episodesReducer } from './episodes-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  episodes: episodesReducer,
  episode: episodeReducer,
  character: characterReducer,
  characters: charactersReducer,
  /*locations: locationsReducer*/
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
