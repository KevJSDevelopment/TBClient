import { Card, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'

const TweetContainer = ({tweet}) => {

    const getTweetUser = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.userId}`)
        const data = await res.json()

        console.log(data)
    }

    useEffect(() => {
        getTweetUser()
    }, [])

    return (
        <Card className="tweet-card" elevation={0}>
            {tweet.message}
        </Card>
    )
}

export default TweetContainer
