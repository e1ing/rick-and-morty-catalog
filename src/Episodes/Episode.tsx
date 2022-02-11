import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'

export type EpisodePropsType = {
  id: number
  name: string
  air_date: string
  episode: string
}

export const Episode: FC<EpisodePropsType> = memo(
  ({ id, episode, name, air_date }) => {
    const navigate = useNavigate()
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`episode/${id}`)
        }}
      >
        <div>
          <span>{episode}</span>
          <span>{name}</span>
          <span>{air_date}</span>
        </div>
      </div>
    )
  }
)

Episode.displayName = 'Episode'
