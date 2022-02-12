import React from 'react'
import {EpisodesPage} from '../Episodes/EpisodesPage'
import {RequestStatusType} from '../dal/app-reducer'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../dal/store'
import Grid from '@mui/material/Grid'
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from '../components/ErrorSnackbar'
import {RoutesComponent} from "../components/RoutesComponent";

export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    return (
        <>
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <h1 style={{textAlign: "center"}}> Rick and Morty</h1>
            <Grid container style={{padding: '20px'}}>
               {/* <Search value={} placeholder={} onChange={}/>*/}
            </Grid>

            <Grid container spacing={3} style={{padding: '30px'}}>
                <EpisodesPage/>
            </Grid>
        </>
    )
}
