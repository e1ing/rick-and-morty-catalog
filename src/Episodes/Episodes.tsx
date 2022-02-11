import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EpisodeType, fetchEpisodesTC } from '../dal/episodes-reducer'
import { Episode } from './Episode'
import { AppRootStateType } from '../dal/store'

export const Episodes = memo(() => {
  const dispatch = useDispatch()
  const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(
    (state) => state.episodes
  )

  useEffect(() => {
    dispatch(fetchEpisodesTC())
  }, [])

  return (
    <div>
      {episodes.map((ep) => (
        <Episode
          key={ep.id}
          id={ep.id}
          episode={ep.episode}
          name={ep.name}
          air_date={ep.air_date}
        />
      ))}
    </div>
  )
})

Episodes.displayName = 'Episodes'
