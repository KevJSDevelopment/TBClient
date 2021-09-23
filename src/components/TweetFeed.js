import React from 'react'
import TweetContainer from './TweetContainer'

const TweetFeed = ({ tweets, textColor, backgroundColor }) => {

    return (
        tweets.map((tweet, index) => {
            return <TweetContainer tweet={tweet} textColor={textColor} backgroundColor={backgroundColor} key={index} />
        })
    )
}

export default TweetFeed
