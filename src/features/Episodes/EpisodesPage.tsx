import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EpisodeType, fetchEpisodesTC} from '../../dal/episodes-reducer'
import {Episode} from './Episode'
import {AppRootStateType} from '../../dal/store'
import {Grid, Paper, Stack} from "@mui/material";
import s from "../../App/App.module.css";
import {useNavigate} from "react-router-dom";

export const EpisodesPage = memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(
        (state) => state.episodes
    )

    useEffect(() => {
        dispatch(fetchEpisodesTC())
    }, [])
//
    return (
        <Grid container justifyContent={"center"}>
        <Stack spacing={2} className={s.app}>
            {episodes.map((ep) => {
                return <Paper key={ep.id} style={{padding: '10px'}}>
                    <div className={s.app}
                         style={{cursor: 'pointer'}}
                         onClick={() => {
                             navigate(`/episode/${ep.id}`)
                         }}
                    >
                        <Episode
                            id={ep.id}
                            episode={ep.episode}
                            name={ep.name}
                            air_date={ep.air_date}
                        />
                    </div>
                </Paper>
            })}
        </Stack>
        </Grid>
    )
})


