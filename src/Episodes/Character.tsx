import {Stack} from '@mui/material'
import React, {FC, memo} from 'react'
import {useNavigate} from 'react-router-dom'

export type CharacterPropsType = {
    id?: number
    name: string
    image: string
}

export const Character: FC<CharacterPropsType> = memo(
    ({id, image, name}) => {
        const navigate = useNavigate()
        return (
            <div
                style={{cursor: 'pointer'}}
                onClick={() => {
                    navigate(`character/${id}`)
                }}
            >
                <Stack spacing={2}>
                    <img src = {image} style={{width: "150px"}}/>
                    <span>{name}</span>
                </Stack>

            </div>
        )
    }
)


