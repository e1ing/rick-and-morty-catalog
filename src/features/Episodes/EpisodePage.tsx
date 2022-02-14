import React, {FC, memo, useEffect} from 'react'
import {Grid, LinearProgress, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../dal/store";
import {useParams} from "react-router-dom";
import {fetchSingleEpisodeTC} from "../../dal/episode-reducer";
import {CharacterType} from "../../dal/character-reducer";
import {fetchMultipleCharactersTC} from "../../dal/characters-reducer";
import {Character} from "../Characters/Character";
import s from "../../App/App.module.css";
import {RequestStatusType} from "../../dal/app-reducer";
import {toGetIds} from "../../utils/toGetIds";

export const EpisodePage: FC = memo(() => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    useEffect(() => {
        dispatch(fetchSingleEpisodeTC(Number(id)))
    }, [id])

    const episode = useSelector<AppRootStateType, string>((state) => state.episode.episode)
    const name = useSelector<AppRootStateType, string>((state) => state.episode.name)
    const air_date = useSelector<AppRootStateType, string>((state) => state.episode.air_date)
    const charactersUrl = useSelector<AppRootStateType, Array<string>>((state) => state.episode.characters)

    const characters = useSelector<AppRootStateType, Array<CharacterType>>((state) => state.characters)


    useEffect(() => {
        if (charactersUrl.length) {
            const characters_id = toGetIds(charactersUrl)
            dispatch(fetchMultipleCharactersTC(characters_id))
        }
    }, [charactersUrl])


    return (
        <Grid container justifyContent={"center"} className={s.app}>
            {status === 'loading' && <LinearProgress/>}
            <Stack>
                <h2 style={{textAlign: "center"}}> Episode </h2>
                <Paper style={{padding: '10px', fontSize: "20px"}}>
                    <div>Episode: {episode}</div>
                    <div>Episode name: {name}</div>
                    <div>Air date: {air_date}</div>
                </Paper>
                <h3 style={{textAlign: "center"}}>Characters in the episode</h3>
                {characters.map((ch) => {
                    return <Stack key={ch.id} spacing={2}>
                        <Paper style={{padding: '10px'}}>
                            <Character id={ch.id}
                                       name={ch.name}
                                       image={ch.image}/>
                        </Paper>
                    </Stack>
                })}
            </Stack>
        </Grid>
    )

})