import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

const HomeHeader = ({ textColor }) => {

    const [tweetDisabled, setTweetDisabled] = useState(true)
    const [user, setUser] = useState(null)

    const getTweetUser = async () => {
        const res = await fetch("https://localhost:5001/poketwitter/tweets/3")
        const data = await res.json()

       setUser(data)
    }

    const checkText = (value) => {

        if(value !== ''){
            setTweetDisabled(false)
        }

        else setTweetDisabled(true)

    }

    const sendTweet = async () => {
        const message = document.getElementById("tweet-message").value

        const meta = {
            method: "POST",

        }

        const res = await fetch("https://localhost:5001/poketwitter/work")
    }

    useEffect(() => {
        getTweetUser()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item className="home-title" xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="inherit" color={textColor} className="home-text">
                            Home
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton className="star-icon" >
                            <AutoAwesomeOutlinedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={1}>
                        {user ? <Avatar variant="circular" sx={{ width: 48, height: 48}} src={`data:image/jpg;base64, ${user.imageFiles}`} /> : null}
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id="tweet-message" className="tweet-text" onChange={(e) => checkText(e.target.value)} placeholder="What's Happening?" InputLabelProps={{style: { color: textColor } }} variant="standard" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnGap={0}>
                    <Grid item xs={1}>
                        
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container columnSpacing={5} >
                            <Grid item xs={1}>
                                <IconButton color="primary" >
                                    <ImageOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Grid>
                            <Grid item  xs={1}>
                                <IconButton color="primary" >
                                    <GifOutlinedIcon fontSize="small" style={{ border: "2px solid #1DA1F2", borderRadius: "5px 5px 5px 5px"}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" >
                                    <BarChartIcon fontSize="medium" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton color="primary" >
                                    <SentimentSatisfiedOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={4}>
                                <IconButton color="primary" >
                                    <EventOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" disabled={tweetDisabled} onClick={sendTweet} color="primary" className="button tweet-2">
                            Tweet
                        </Button>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HomeHeader
