import React from 'react';
import {EpisodesPage} from '../features/Episodes/EpisodesPage';
import {RequestStatusType} from '../dal/app-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../dal/store';
import Grid from '@mui/material/Grid';
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import s from './App.module.css';
import {Search} from "../components/Search";

export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    return (
        <div className={s.app}>
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <h1 style={{textAlign: "center"}}> Rick and Morty app</h1>
            <Grid container style={{padding: '20px'}}>
                 <Search/>
            </Grid>
            <h2 style={{textAlign: "center"}}>Episodes list</h2>
            <Grid container spacing={3} style={{padding: '30px'}}>
                <EpisodesPage/>
            </Grid>
        </div>
    )
}
