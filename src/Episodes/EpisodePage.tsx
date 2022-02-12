import React, {FC, memo, useEffect} from 'react'
import {Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../dal/store";
import {useParams} from "react-router-dom";
import {fetchSingleEpisodeTC} from "../dal/episode-reducer";
import {CharacterType} from "../dal/character-reducer";
import {fetchMultipleCharactersTC} from "../dal/characters-reducer";
import {Character} from "../Characters/Character";

export const EpisodePage: FC =memo( () => {
    const {id} = useParams();
    const dispatch = useDispatch()

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
            const characters_id = charactersUrl.map((ch) => {
                const arr = ch.split('/')
                return +arr[arr.length - 1]
            })
            dispatch(fetchMultipleCharactersTC(characters_id))
        }
    }, [charactersUrl])


    return (
        <>
            <h2 style={{textAlign: "center"}}> Episode </h2>
            <Stack direction="row" spacing={2}>
                <Paper style={{padding: '10px', fontSize: "20px"}}>
                    <div>{episode}</div>
                    <div> {name}</div>
                    <div> {air_date}</div>
            </Paper>
            </Stack>
            <h3>Characters in the episode</h3>
            <Stack spacing={2}>
                {characters.map((ch) => (
                    <Paper key={ch.id} style={{padding: '10px'}}>
                        <Character id={ch.id} name={ch.name} image={ch.image}/>
                    </Paper>
                ))}
            </Stack>
        </>
    )

})