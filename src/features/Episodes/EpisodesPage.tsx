import React, {memo, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {EpisodeType} from '../../dal/episodes-reducer'
import {Episode} from './Episode'
import {AppRootStateType} from '../../dal/store'
import {Grid, LinearProgress, Paper, Stack} from "@mui/material";
import s from "../../App/App.module.css";
import {useNavigate} from "react-router-dom";
import {RequestStatusType} from "../../dal/app-reducer";
import InfiniteScroll from "react-infinite-scroll-component";

export const EpisodesPage = memo(() => {
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status
    )
    const navigate = useNavigate()

    //paginator
    const [items, setItems] = useState<Array<EpisodeType>>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchEpisodes = async () => {
        const res = await fetch(
            `https://rickandmortyapi.com/api/episode?page=${page}`
        );
        const data = await res.json();
        debugger
        return data.results;
    }

    const fetchData = async () => {
        const episodesFromServer = await fetchEpisodes();
        // debugger
        setItems([...items, ...episodesFromServer]);
        if (episodesFromServer.length === 0 || episodesFromServer.length < 20) {
            setHasMore(false)
        }
        setPage(page + 1)
    };
    console.log(items)

    return (
        <Grid container justifyContent={"center"}>
            {status === 'loading' && <LinearProgress/>}
            <Stack spacing={2} className={s.app}>
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<LinearProgress/>}
                    endMessage={
                        <p style={{}}>
                            <b>Yay! you have seen it all</b>
                        </p>
                    }
                >
                    {items.map((ep) => {
                        return <Paper key={ep.id} style={{padding: '10px'}}>
                            <div className={s.app}
                                 style={{cursor: 'pointer'}}
                                 onClick={() => {
                                     navigate(`/episode/${ep.id}`)
                                 }}
                            >
                                <Episode
                                    id={ep.id}
                                    episode={ep.episode}
                                    name={ep.name}
                                    air_date={ep.air_date}
                                />

                            </div>

                        </Paper>
                    })}
                </InfiniteScroll>
            </Stack>
        </Grid>
    )
})


