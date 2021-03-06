import {Stack} from '@mui/material'
import React, {FC, memo} from 'react'

export type EpisodePropsType = {
  id?: number
  name: string
  air_date: string
  episode: string
}

export const Episode: FC<EpisodePropsType> = memo(
  ({episode, name, air_date}) => {
    return (
          <Stack direction="row" spacing={2}>
              <span>{episode}</span>
              <span>{name}</span>
              <span>{air_date}</span>
          </Stack>

    )
  }
)

