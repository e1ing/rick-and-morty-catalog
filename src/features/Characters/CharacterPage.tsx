import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {CharacterType, fetchSingleCharacterTC} from "../../dal/character-reducer";
import {AppRootStateType} from "../../dal/store";
import {Grid, LinearProgress, Paper, Stack} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import s from "../../App/App.module.css";
import {EpisodeType, fetchMultipleEpisodesTC} from "../../dal/episodes-reducer";
import {Episode} from "../Episodes/Episode";
import {RequestStatusType} from "../../dal/app-reducer";
import {toGetIds} from "../../utils/toGetIds";

export const CharacterPage = memo(() => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const navigate = useNavigate()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const character = useSelector<AppRootStateType, CharacterType>(state => state.character)
    const episodesUrl = useSelector<AppRootStateType, Array<string>>(state => state.character.episode)

    const locationUrl = useSelector<AppRootStateType, string>(state => state.character.location.url)

    const location_id = toGetIds([locationUrl])

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleCharacterTC(Number(id)))
        }
    }, [id])

  /*  useEffect(() => {
        if (episodesUrl.length) {
            const episodes_id = toGetIds(episodesUrl)
            dispatch(fetchMultipleEpisodesTC(episodes_id))
        }
    }, [episodesUrl])*/
    const episodes = useSelector<AppRootStateType, Array<EpisodeType>>(state => state.episodes)
console.log("Episodes", episodes)
    return (
        <Grid container justifyContent={"center"} className={s.app}>
            <Stack>
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
                <h3 style={{textAlign: "center"}}>Location</h3>
                <Paper style={{padding: '10px'}}>
                    <div onClick={() => {
                        navigate(`/location/${location_id[0]}`)
                    }}
                         style={{cursor: 'pointer'}}>
                        {character.location.name} </div>
                </Paper>
                <h3 style={{textAlign: "center"}}>Episodes</h3>
                <Stack spacing={3}>
                    {episodes.map(ep => {
                        return <Paper key={ep.id} style={{padding: '10px'}}>
                            <div className={s.app}
                                 style={{cursor: 'pointer'}}
                                 onClick={() => {
                                     navigate(`/episode/${ep.id}`)
                                 }}
                            >
                                <Episode
                                    name={ep.name}
                                    air_date={ep.air_date}
                                    episode={ep.episode}/>
                            </div>
                        </Paper>
                    })
                    }
                </Stack>
            </Stack>
        </Grid>
    )
})