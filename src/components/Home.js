import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import HomeHeader from './HomeComponents/HomeHeader'
import TweetFeed from './HomeComponents/TweetFeed'
import { CircularProgress, circularProgressClasses, LinearProgress, linearProgressClasses } from '@mui/material'
import { Box, styled } from '@mui/system'

const Home = ({ handleProfileView, handleViewTweet, textColor, backgroundColor, loggedInUser }) => {

    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)

    const url = `https://localhost:5001/home/${loggedInUser.username}`

    const getTweets = async () => {
        const res = await fetch(url)
        const data = await res.json()
        
        setLoading(true)
        setTimeout(() => handleSetTweets(data), 1000)
    }

    const handleSetTweets = (data) => {
        setTweets(data)
        setLoading(false)
    }

    function FacebookCircularProgress(props) {
        return (
          <Box sx={{ position: 'relative', left: "50%",  }}>
            <CircularProgress
              variant="determinate"
              sx={{
                color: (theme) =>
                  theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
              }}
              size={40}
              thickness={4}
              {...props}
              value={100}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: 'round',
                },
              }}
              size={40}
              thickness={4}
              {...props}
            />
          </Box>
        );
      }

    useEffect(() => {
        getTweets()
    }, [])

    return (
        <Grid item xs={12} >
            <HomeHeader loggedInUser={loggedInUser} getTweets={getTweets} textColor={textColor} />
            {loading ? <FacebookCircularProgress /> : <TweetFeed handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} getTweets={getTweets} backgroundColor={backgroundColor} textColor={textColor} tweets={tweets} />}
        </Grid>
    )
}

export default Home
