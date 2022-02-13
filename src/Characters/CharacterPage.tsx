import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {CharacterType, fetchSingleCharacterTC} from "../dal/character-reducer";
import {AppRootStateType} from "../dal/store";
import {LinearProgress, Paper, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import s from "../App/App.module.css";
import {EpisodeType, fetchMultipleEpisodesTC} from "../dal/episodes-reducer";
import {Episode} from "../Episodes/Episode";
import {RequestStatusType} from "../dal/app-reducer";
import {toGetIds} from "../utils/toGetIds";

export const CharacterPage = memo(() => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const navigate = useNavigate()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const character = useSelector<AppRootStateType, CharacterType>(state => state.character)
    const episodesUrl = useSelector<AppRootStateType, Array<string>>(state => state.character.episode)
    const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(state => state.episodes)
    const locationUrl = useSelector<AppRootStateType, string>(state => state.character.location.url)

    const arrFromLocUrl = locationUrl.split('/')
    const location_id = +arrFromLocUrl[arrFromLocUrl.length-1]

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleCharacterTC(Number(id)))
        }
    }, [id])

    useEffect(() => {
        if (episodesUrl.length) {
            const episodes_id = toGetIds(episodesUrl)
            dispatch(fetchMultipleEpisodesTC(episodes_id))
        }
    }, [episodesUrl])


    return (
        <div className={s.app}>
            {status === 'loading' && <LinearProgress/>}
            <h2 style={{textAlign: "center"}}>Character</h2>
            <Stack direction="row" spacing={2}>
                <Paper style={{padding: '10px', fontSize: "20px"}}>
                    <img src={character.image} alt={"character photo"}/>
                </Paper>
                <Paper style={{padding: '10px', fontSize: "20px"}}>
                    <div>Name: {character.name}</div>
                    <div>Status: {character.status}</div>
                    <div>Species: {character.species}</div>
                    <div>Gender: {character.gender}</div>
                    <div>Origin: {character.origin.name}</div>
                </Paper>
            </Stack>
            <h3>Location</h3>
            <Paper style={{padding: '10px', fontSize: "20px"}}>
                <div onClick={() => {
                    navigate(`/location/${location_id}`)
                }}
                     style={{cursor: 'pointer'}}>
                    Location: {character.location.name} </div>
            </Paper>
            <h3>Episodes</h3>
            <Stack spacing={2}>
                {episodes.map((ch) => (
                    <Paper key={ch.id} style={{padding: '10px'}}>
                        <Episode
                            name={ch.name}
                            air_date={ch.air_date}
                            episode={ch.episode}/>
                    </Paper>
                ))}
            </Stack>
        </div>
    )
})