import React, {FC} from 'react'
import {Button, FormGroup, Grid, TextField} from '@mui/material'
import {useDispatch} from "react-redux";
import {FormikProps, useFormik} from "formik";
import {filterEpisodesTC} from "../dal/episodes-reducer";

type FormikErrorType = {
    search?: string
}

/*interface FormValues {
    search: string;
}*/

export const Search = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            search: ""
        },
        validate: (values) => {
            const error: FormikErrorType = {};
            if (!values.search) {
                error.search = 'Required';
            }
            return error;
        },
        onSubmit: (values: {search: string}) => {
            dispatch(filterEpisodesTC(values.search))
            formik.resetForm();
        },
    })

    return (
        <Grid container  justifyContent={"center"}>
            <Grid item xs={5}>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField
                        label={"Search episode by name"}
                        {...formik.getFieldProps("search")}
                    />
                    {formik.errors.search && <div style={{color: "red", textAlign: "center"}}>{formik.errors.search}</div>}
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Search</Button>
                </FormGroup>
            </form>
            </Grid>
        </Grid>
    )
}

