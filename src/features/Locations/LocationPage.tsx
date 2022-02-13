import React, {memo, useEffect} from 'react'
import s from "../../App/App.module.css";
import {LinearProgress, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../dal/store";
import {RequestStatusType} from "../../dal/app-reducer";
import {fetchSingleLocationTC, LocationType} from "../../dal/location-reducer";
import {useParams} from "react-router-dom";
import {fetchMultipleCharactersTC} from "../../dal/characters-reducer";
import {CharacterType} from "../../dal/character-reducer";
import {EpisodeType, fetchMultipleEpisodesTC} from "../../dal/episodes-reducer";
import {Episode} from '../Episodes/Episode';
import {toGetIds} from "../../utils/toGetIds";

export const LocationPage = memo(() => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const location = useSelector<AppRootStateType, LocationType>(state => state.location)
    const charactersUrl = useSelector<AppRootStateType, Array<string>>(state => state.location.residents)
    const characters_id = toGetIds(charactersUrl)

    //fetch location information
    useEffect(() => {
        if (id) {
            dispatch(fetchSingleLocationTC(Number(id)))
        }
    }, [id])

    //fetch characters in this location
    /*useEffect(() => {
        dispatch(fetchMultipleCharactersTC(characters_id))
    }, [characters_id])*/

    //fetch episodes_id from characters, who are mentioned in this location
  /* const char = useSelector<AppRootStateType, CharacterType>(state => state.character)*/

    const charactersFromLocation = useSelector<AppRootStateType, Array<CharacterType>>(state => state.characters)
    const episodesFromCharactersUrl = charactersFromLocation.map(ch => {
        return ch.episode[ch.episode.length - 1]
    })
    const episodes_id = toGetIds(episodesFromCharactersUrl)

    //fetch episodes
    useEffect(() => {
        if (episodes_id.length) {
            dispatch(fetchMultipleEpisodesTC(episodes_id))
        }
    }, [])

    const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(state => state.episodes)

    return (
        <div className={s.app}>
            {status === 'loading' && <LinearProgress/>}
            <h2 style={{textAlign: "center"}}>Location</h2>
            <Stack direction="row" spacing={2}>
                <Paper style={{padding: '10px', fontSize: "20px"}}>
                    <div>Location name: {location.name}</div>
                    <div>Type: {location.type}</div>
                    <div>Dimension: {location.dimension}</div>
                </Paper>
            </Stack>
            <h3>Episodes</h3>
            <Stack spacing={3}>
                {episodes.map((ep) => {
                   return <Paper key={ep.id} style={{padding: '10px'}}>
                        <Episode
                            name={ep.name}
                            air_date={ep.air_date}
                            episode={ep.episode}/>
                    </Paper>
                })
                }
            </Stack>
        </div>
    )
})