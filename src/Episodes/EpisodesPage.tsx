import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EpisodeType, fetchEpisodesTC} from '../dal/episodes-reducer'
import {Episode} from './Episode'
import {AppRootStateType} from '../dal/store'
import {Paper, Stack} from "@mui/material";

export const EpisodesPage = memo(() => {
    const dispatch = useDispatch()
    const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(
        (state) => state.episodes
    )

    useEffect(() => {
        dispatch(fetchEpisodesTC())
    }, [])
//
    return (
        <Stack spacing={2}>
            {episodes.map((ep) => (
                <Paper style={{padding: '10px'}}>
                    <Episode
                        key={ep.id}
                        id={ep.id}
                        episode={ep.episode}
                        name={ep.name}
                        air_date={ep.air_date}
                    />
                </Paper>
            ))}
        </Stack>
    )
})


