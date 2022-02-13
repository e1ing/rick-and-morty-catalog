import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input, TextField} from '@mui/material'
import s from "../App/App.module.css";

type SearchPropsType = {
    value: string
    placeholder: string
    onChange: (text: string) => void
}

export const Search: FC<SearchPropsType> = ({value, placeholder, onChange, ...inputProps}) => {
    // state for keeping search text
    const [searchText, setSearchText] = useState<string>(value)
    // state for keeping the timeout
    const [searchTextTimeout, setSearchTextTimeout] = useState<number>(0)

    // onChange handler
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        // cancelling previous timeouts
        if (searchTextTimeout) {
            clearTimeout(searchTextTimeout)
        }
        // first update the input text as user type
        setSearchText(e.currentTarget.value)
        // initialize a setimeout by wrapping in our searchTextTimeout so that we can clear it out using clearTimeout
        setSearchTextTimeout(
            +setTimeout(() => {
                onChange(e.target.value)
                // timeout is 2500ms, change it to less or more.
            }, 1500)
        )
    }

    // making sure that we clear the timeout if/when the component unmount
    useEffect(() => {
        return () => clearTimeout(searchTextTimeout)
    }, [searchTextTimeout])

    return (
        <TextField fullWidth
            id="filled-basic"
            label={placeholder}
            variant="filled"
            value={searchText}
            onChange={handleOnChange}
            className={s.app}
        />


    )
}
