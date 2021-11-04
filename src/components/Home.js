import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import HomeHeader from './HomeHeader'
import TweetFeed from './TweetFeed'

const Home = ({ textColor, backgroundColor }) => {

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
            <HomeHeader textColor={textColor} tweets={tweets} setTweets={setTweets} />
            <TweetFeed  backgroundColor={backgroundColor} textColor={textColor} tweets={tweets} />
        </Grid>
    )
}

export default Home
