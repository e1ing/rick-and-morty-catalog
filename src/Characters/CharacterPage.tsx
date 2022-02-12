import React, {memo, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {CharacterType, fetchSingleCharacterTC} from "../dal/character-reducer";
import {AppRootStateType} from "../dal/store";
import {Paper} from "@mui/material";
import {useParams} from "react-router-dom";

export const CharacterPage = memo(() => {
    const dispatch = useDispatch()
    const {id} = useParams();

    useEffect(() => {
        if(id){
            dispatch(fetchSingleCharacterTC(Number(id)))
    }}, [id])

    const character = useSelector<AppRootStateType, CharacterType>(state => state.character)

    return (
        <>
            <h2>Character</h2>
            <Paper style={{padding: '10px', fontSize: "20px"}}>
                <img src={character.image} alt={"character photo"}/>
            </Paper>
            <Paper style={{padding: '10px', fontSize: "20px"}}>
                <div>{character.name}</div>
                <div> {character.status}</div>
                <div>{character.species}</div>
                <div>{character.gender}</div>
                <div>{character.origin.name}</div>
            </Paper>

            <Paper style={{padding: '10px', fontSize: "20px"}}>
                {character.location.name}
            </Paper>
            {character.episode.map((ch) => (
                <Paper style={{padding: '10px'}}>
                    {ch}
                </Paper>
            ))}
        </>
    )
})