import {Stack} from '@mui/material'
import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import s from "../../App/App.module.css";

export type EpisodePropsType = {
  id?: number
  name: string
  air_date: string
  episode: string
}

export const Episode: FC<EpisodePropsType> = memo(
  ({id, episode, name, air_date}) => {
    const navigate = useNavigate()
    return (
      <div className={s.app}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/episode/${id}`)
        }}
      >
          <Stack direction="row" spacing={2}>
              <span>{episode}</span>
              <span>{name}</span>
              <span>{air_date}</span>
          </Stack>

      </div>
    )
  }
)
