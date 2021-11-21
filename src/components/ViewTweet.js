import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TweetReply from './ViewTweetComponents/TweetReply'

const ViewTweet = ({viewTweet}) => {

    const [replies, setReplies] = useState([])

    const getReplies = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/quotetweets/${viewTweet.tweetId}`)
        const data = await res.json()

        setReplies(data)
    }

    useEffect(() => {
        getReplies();
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
                {replies.length > 0 ? replies.map(reply => {
                    return <TweetReply reply={reply}/>
                }) : null}
            </Grid>
        </Grid>
    )
}

export default ViewTweet
