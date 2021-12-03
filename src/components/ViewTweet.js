import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './GlobalComponents/Header'
import { FacebookCircularProgress } from './GlobalComponents/Loading'
import ViewReplyContainer from './ViewTweetComponents/ViewReplyContainer'
import ViewTweetContainer from './ViewTweetComponents/ViewTweetContainer'

const ViewTweet = ({viewTweet, handleProfileView, textColor, handleViewTweet, loggedInUser, tweets, getTweets, backgroundColor, loading}) => {

    const [replies, setReplies] = useState([])

    const getReplies = async () => {
        debugger
        const res = await fetch(`http://localhost:5000/poketwitter/replies/${viewTweet.tweetId}`)
        const data = await res.json()

        setReplies(data)
    }

    useEffect(() => {
        if(viewTweet) getReplies();
    }, [viewTweet])

    return (
        <Grid container>
            <Header text={"Tweet"} textColor={textColor} backButton={true} />
            {loading ? 
             <FacebookCircularProgress /> :
            <Grid item xs={12}>
                <ViewTweetContainer handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} tweets={tweets} getTweets={getTweets} tweet={viewTweet} textColor={textColor} backgroundColor={backgroundColor} />
                {replies.length > 0 ? replies.map((reply,index) => {
                    return <ViewReplyContainer getTweets={getTweets} handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} backgroundColor={backgroundColor} loggedInUser={loggedInUser} reply={reply} textColor={textColor} key={index} />
                }) : null}
            </Grid>}
        </Grid>
    )
}

export default ViewTweet
