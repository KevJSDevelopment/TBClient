import React from 'react'
import Grid from '@mui/material/Grid'
import HomeHeader from '../components/HomeComponents/HomeHeader'
import TweetFeed from '../components/HomeComponents/TweetFeed'
import { FacebookCircularProgress } from '../components/Loading'
import Header from '../components/Header'


const Home = ({ handleProfileView, handleViewTweet, textColor, backgroundColor, loggedInUser, getTweets, loading, tweets }) => {

    return (
        <Grid item xs={12}>
            <Header text={"Home"} textColor={textColor} />
            <HomeHeader loggedInUser={loggedInUser} getTweets={getTweets} textColor={textColor} />
            {loading ? <FacebookCircularProgress /> : <TweetFeed handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} getTweets={getTweets} backgroundColor={backgroundColor} textColor={textColor} tweets={tweets} />}
        </Grid>
    )
}

export default Home
