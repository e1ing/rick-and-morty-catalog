import React, {FC, useEffect} from 'react'
import {Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../dal/store";
import {useParams} from "react-router-dom";
import {fetchSingleEpisodeTC} from "../dal/episode-reducer";

/*
type EpisodePagePropsType = {
    id: number
    name: string
    air_date: string
    episode: string
    characters: Array<string>
    url?: string
    created?: string
}
*/

export const EpisodePage: FC = () => {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSingleEpisodeTC(id))
    }, [id])

    const episode = useSelector<AppRootStateType, string>((state) => state.episode.episode)
    const name = useSelector<AppRootStateType, string>((state) => state.episode.name)
    const air_date = useSelector<AppRootStateType, string>((state) => state.episode.air_date)
    const characters = useSelector<AppRootStateType, Array<string>>((state) => state.episode.characters)



    return (
        <Stack direction="column" spacing={2}>
            <span>{episode}</span>
            <span>{name}</span>
            <span>{air_date}</span>
            <span>{characters}</span>
        </Stack>
    )

}