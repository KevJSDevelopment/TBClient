import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, TextField, Typography } from '@mui/material'
import HomeHeader from './HomeHeader'
import TweetFeed from './TweetFeed'

const Home = () => {

    const [tweets, setTweets] = useState([])

    const url = "https://localhost:5001/tweets"

    const getTweets = async () => {
        const res = await fetch(url)
        const data = await res.json()
        
        setTweets(data)
    }

    useEffect(() => {
        getTweets()
    }, [])

    return (
        <Grid item xs={12} >
            <HomeHeader />
            <br/>
            <TweetFeed tweets={tweets} />
        </Grid>
    )
}

export default Home
