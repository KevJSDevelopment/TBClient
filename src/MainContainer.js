import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Nav from "./containers/Nav"
import Home from "./containers/Home"
import Discover from "./containers/Discover"
import {
  Routes,
  Route, 
  useNavigate, Navigate
} from "react-router-dom";
import Profile from './containers/Profile'
import ViewTweet from './containers/ViewTweet'
import Bookmarks from './containers/Bookmarks'



const MainContainer = ({ textColor, background, setBackground, backgroundColor, loggedInUser, setUser}) => {

  const [viewTweet, setViewTweet] = useState(false)
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(true)


  const url = `https://localhost:5001/home/${loggedInUser.username}`

  const navigate = useNavigate();

  const handleViewTweet = async (e, tweetId) => {
    if(e) e.stopPropagation();

    sessionStorage.removeItem('ViewTweet')

    const res = await fetch(`https://localhost:5001/poketwitter/viewtweet/${tweetId}`);

    const data = await res.json()

    setViewTweet(data)
    sessionStorage.setItem('ViewTweet', JSON.stringify(data))

    if(e) navigate('ViewTweet', { viewTweet: viewTweet });
  }

  const handleProfileView = async (e, user) => {
    e.stopPropagation();

    navigate(`Profile/${user.username}`)
  }

  const handleHomeView = async (e) => {
    e.stopPropagation();
    navigate("/")
  }

  const getTweets = async () => {
    const res = await fetch(url)
    const data = await res.json()
    
    setTimeout(() => handleSetTweets(data), 1000)
  }

  const handleSetTweets = (data) => {
    setTweets(data)
    setLoading(false)
  }

  const checkViewTweetActive = () => {
    if(sessionStorage.getItem("ViewTweet")){
      setLoading(true)
      handleViewTweet(null, JSON.parse(sessionStorage.getItem('ViewTweet')).tweetId)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    } 
    else navigate('/')
  }

  useEffect(() => {
    getTweets()
    checkViewTweetActive()
  }, [])

  return (
      <Grid container spacing={1}>
        <Grid item xs={4} className={backgroundColor==="white" ? "nav" : "dark-nav"}>
          <Grid container >
            <Grid item xs={7} />
            <Nav loggedInUser={loggedInUser} backgroundColor={backgroundColor} background={background} textColor={textColor} setBackground={setBackground} setUser={setUser} />
          </Grid>
        </Grid>
        <Grid item xs={4} >
          <Grid container>
            <Routes>
              <Route path="/" element={<Home loggedInUser={loggedInUser} getTweets={getTweets} tweets={tweets} loading={loading} textColor={textColor} backgroundColor={backgroundColor} handleViewTweet={handleViewTweet} handleProfileView={handleProfileView} />} />
              <Route path="Profile/:username" element={<Profile textColor={textColor} backgroundColor={backgroundColor} handleViewTweet={handleViewTweet} handleProfileView={handleProfileView} loggedInUser={loggedInUser} />}  />
              <Route path="ViewTweet" element={<ViewTweet loading={loading} viewTweet={viewTweet} textColor={textColor} getTweets={getTweets} handleProfileView={handleProfileView} loggedInUser={loggedInUser} backgroundColor={backgroundColor} handleViewTweet={handleViewTweet} />} />
              <Route path="Bookmarks" element={<Bookmarks loggedInUser={loggedInUser} handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} backgroundColor={backgroundColor} getTweets={getTweets} textColor={textColor} />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Grid>
        </Grid>
        <Grid item className={backgroundColor==="white" ? "discover" : "dark-discover"} xs={4}>
          <Grid container>
            <Discover loggedInUser={loggedInUser} />
          </Grid>
        </Grid>
    </Grid>
  )
}

export default MainContainer
