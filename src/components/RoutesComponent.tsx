import React from 'react'
import {Routes, Route} from 'react-router-dom';
import {EpisodePage} from '../features/Episodes/EpisodePage';
import { Error404 } from './Error404';
import {App} from "../App/App";
import {CharactersPage} from "../features/Characters/CharactersPage";
import {LocationPage} from "../features/Locations/LocationPage";

export const PATH = {
    EPISODE: '/episode',
    CHARACTER: '/character',
    LOCATION: '/location',
    ERROR_404: "/404",
}
export const RoutesComponent = () => {
    return (
        <div>
                <Routes>
                    <Route path={`/`} element={<App/>}/>
                    <Route path={`${PATH.EPISODE}/:id`} element={<EpisodePage/>}/>
                    <Route path={`${PATH.CHARACTER}/:id`} element={<CharactersPage/>}/>
                    <Route path={`${PATH.LOCATION}/:id`} element={<LocationPage/>}/>
                    <Route path={PATH.ERROR_404} element={<Error404/>}/>
                    <Route path={'/*'} element={<Error404/>}/>
                </Routes>
        </div>
    )
}
