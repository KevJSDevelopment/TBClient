import { Grid } from '@mui/material'
import React from 'react'

const TweetReply = ({ reply }) => {


    return (
        <Grid item xs={12}>
            {reply.message}
        </Grid>
    )
}

export default TweetReply
