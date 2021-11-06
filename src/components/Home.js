import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import HomeHeader from './HomeHeader'
import TweetFeed from './TweetFeed'

const Home = ({ textColor, backgroundColor, user }) => {

    const [tweets, setTweets] = useState([])

    const url = `https://localhost:5001/home/${user.username}`

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
            <HomeHeader user={user} textColor={textColor} tweets={tweets} setTweets={setTweets} />
            <TweetFeed getTweets={getTweets} backgroundColor={backgroundColor} textColor={textColor} tweets={tweets} />
        </Grid>
    )
}

export default Home
