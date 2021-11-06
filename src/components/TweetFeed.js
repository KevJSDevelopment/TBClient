import React from 'react'
import TweetContainer from './TweetContainer'

const TweetFeed = ({ tweets, textColor, backgroundColor, getTweets }) => {

    return (
        tweets.map((tweet, index) => {
            return <TweetContainer getTweets={getTweets} tweet={tweet} textColor={textColor} backgroundColor={backgroundColor} key={index} />
        })
    )
}

export default TweetFeed
