import React from 'react'
import TweetContainer from './TweetContainer'

const TweetFeed = ({ tweets }) => {

    return (
        tweets.map((tweet, index) => {
            return <TweetContainer tweet={tweet} key={index} />
        })
    )
}

export default TweetFeed
