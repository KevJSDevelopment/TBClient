import React from 'react'
import TweetContainer from './TweetContainer'

const TweetFeed = ({ handleProfileView, handleViewTweet, loggedInUser, tweets, textColor, backgroundColor, getTweets }) => {

    return (
        tweets.map((tweet, index) => {
            return <TweetContainer handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} tweets={tweets} getTweets={getTweets} tweet={tweet} textColor={textColor} backgroundColor={backgroundColor} index={index} key={index} />
        })
    )
}

export default TweetFeed
