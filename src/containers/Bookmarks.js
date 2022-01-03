import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TweetContainer from '../components/HomeComponents/TweetContainer'
import ViewReplyContainer from '../components/ViewTweetComponents/ViewReplyContainer'
import ViewTweetContainer from '../components/ViewTweetComponents/ViewTweetContainer'

const Bookmarks = ({ loggedInUser, handleProfileView, handleViewTweet, backgroundColor, getTweets, textColor }) => {

    const [bookmarks, setBookmarks] = useState([])

    const getBookMarks = async () => {

        const res = await fetch(`http://localhost:5000/poketwitter/bookmarks/${loggedInUser.username}`)

        const data = await res.json()

        setBookmarks(data)
    }

    useEffect(() => {
        getBookMarks();
    }, [])

    return (
        <Grid item xs={12}>
            <Grid Container>
                <Grid item xs={12}>
                    <Header text={"Bookmarks"} textColor={textColor} backButton={true}/>
                </Grid>
                <Grid item xs={12}>
                    {bookmarks.map((bookmark, index) => { return <TweetContainer tweet={bookmark} loggedInUser={loggedInUser} handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} backgroundColor={backgroundColor} getTweets={getTweets} textColor={textColor} key={index} /> })}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Bookmarks
