import {Stack} from '@mui/material'
import React, {FC, memo} from 'react'
import {useNavigate} from 'react-router-dom'
import s from "../../App/App.module.css";

export type CharacterPropsType = {
    id: number|null
    name: string
    image: string
}

export const Character: FC<CharacterPropsType> = memo(
    ({id, image, name}) => {
        const navigate = useNavigate()
        return (
            <div className={s.app}
                style={{cursor: 'pointer'}}
                onClick={() => {
                    navigate(`/character/${id}`)
                }}
            >
                <Stack spacing={2}>
                    <img src = {image} style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "150px"}}/>
                    <span style={{textAlign: "center"}}>{name}</span>
                </Stack>

            </div>
        )
    }
)


