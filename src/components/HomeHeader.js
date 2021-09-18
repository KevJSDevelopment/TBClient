import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, TextField, Typography } from '@material-ui/core'

const HomeHeader = () => {
    return (
        <Grid container spacing={2}>
            <Grid item className="home-title" xs={12}>
                <Typography variant="overline">
                    Home
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField className="tweet-text" placeholder="What's Happening?" variant="standard" />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" className="button tweet-2">
                    Tweet
                </Button>
            </Grid>
        </Grid>
    )
}

export default HomeHeader
