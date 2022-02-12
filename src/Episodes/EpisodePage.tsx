import React, {FC, useEffect} from 'react'
import {Grid, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../dal/store";
import {useParams} from "react-router-dom";
import {fetchSingleEpisodeTC} from "../dal/episode-reducer";

export const EpisodePage: FC = () => {
    console.log("episodePage")
    const {id} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleEpisodeTC(Number(id)))
    }, [id])

    const episode = useSelector<AppRootStateType, string>((state) => state.episode.episode)
    const name = useSelector<AppRootStateType, string>((state) => state.episode.name)
    const air_date = useSelector<AppRootStateType, string>((state) => state.episode.air_date)
    const characters = useSelector<AppRootStateType, Array<string>>((state) => state.episode.characters)


    return (
        <>
            <h2 style={{textAlign: "center"}}> Episode </h2>
            <Stack direction="row" spacing={2}>
                <Paper style={{padding: '10px'}}>{episode}</Paper>
                <Paper style={{padding: '10px'}}>{name}</Paper>
                <Paper style={{padding: '10px'}}>{air_date}</Paper>
            </Stack>
            <h3>Characters in the episode</h3>
            <Stack spacing={2}>
                {characters.map((ch) => (
                    <Paper style={{padding: '10px'}}>{ch}</Paper>
                ))}
            </Stack>
        </>
    )

}