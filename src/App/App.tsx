import React from 'react'
import {Episodes} from '../Episodes/Episodes'
import {RequestStatusType} from '../dal/app-reducer'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../dal/store'
import Grid from '@mui/material/Grid'
import {LinearProgress} from "@mui/material";
import {ErrorSnackbar} from '../components/ErrorSnackbar'

export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    return (
        <>
            <ErrorSnackbar/>
            <h2> Rick and Morty</h2>
            <Grid container style={{padding: '20px'}}>
               {/* <Search value={} placeholder={} onChange={}/>*/}
            </Grid>

            <Grid container spacing={3} style={{padding: '30px'}}>
                <Episodes/>
            </Grid>
            {status === 'loading' && <LinearProgress/>}
        </>
    )
}
