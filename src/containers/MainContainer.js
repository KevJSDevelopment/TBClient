import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Nav from "../components/Nav"
import Home from "../components/Home"
import Discover from "../components/Discover"
import {
  Routes,
  Route, 
  useNavigate
} from "react-router-dom";
import Profile from '../components/Profile'
import ViewTweet from '../components/ViewTweet'



const MainContainer = ({ textColor, background, setBackground, backgroundColor, loggedInUser}) => {

  const [viewTweet, setViewTweet] = useState(false)
  const [profile, setProfile] = useState(false)

  const navigate = useNavigate();

  const handleViewTweet = async (e, tweetId) => {
    e.stopPropagation();

    const res = await fetch(`https://localhost:5001/poketwitter/viewtweet/${tweetId}`);

    const data = await res.json()

    setViewTweet(data)

    navigate('ViewTweet')
  }

  const handleProfileView = async (e, userId) => {
    e.stopPropagation();

    const res = await fetch(`http://localhost:5000/poketwitter/tweets/${userId}`);

    const data = await res.json()

    setProfile(data)
    navigate('Profile')
  }

  const handleHomeView = async (e) => {
    e.stopPropagation();
    navigate("/")
  }

  return (
      <Grid container spacing={1}>
        <Grid item className={backgroundColor == "white" ? "nav" : "dark-nav"} xs={4}>
          <Grid container>
            <Grid item xs={7} />
            <Nav background={background} textColor={textColor} setBackground={setBackground} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
          <Routes>
            <Route path="/" element={<Home loggedInUser={loggedInUser} textColor={textColor} backgroundColor={backgroundColor} handleViewTweet={handleViewTweet} handleProfileView={handleProfileView} />} />
            <Route path="Profile" element={<Profile profile={profile} />} />
            <Route path="ViewTweet" element={<ViewTweet viewTweet={viewTweet} />} />
          </Routes>
          </Grid>
        </Grid>
        <Grid item className={backgroundColor == "white" ? "discover" : "dark-discover"} xs={4}>
          <Grid container>
            <Discover textColor={textColor} />
          </Grid>
        </Grid>
    </Grid>
  )
}

export default MainContainer
