import React from 'react'
import Grid from '@mui/material/Grid'
import HomeHeader from './HomeComponents/HomeHeader'
import TweetFeed from './HomeComponents/TweetFeed'
import { FacebookCircularProgress } from './GlobalComponents/Loading'
import Header from './GlobalComponents/Header'


const Home = ({ handleProfileView, handleViewTweet, textColor, backgroundColor, loggedInUser, getTweets, loading, tweets }) => {

    return (
        <Grid item xs={12}>
            <Header text={"home"} textColor={textColor} />
            <HomeHeader loggedInUser={loggedInUser} getTweets={getTweets} textColor={textColor} />
            {loading ? <FacebookCircularProgress /> : <TweetFeed handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} getTweets={getTweets} backgroundColor={backgroundColor} textColor={textColor} tweets={tweets} />}
        </Grid>
    )
}

export default Home
