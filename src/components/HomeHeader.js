import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Avatar, Button, IconButton, Input, TextField, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

const HomeHeader = ({ textColor, tweets, setTweets }) => {

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

    const checkFile = (e) => {
        const file = e.target.files[0]
    }

    const sendTweet = async () => {
        const formData = new FormData();
        const message = document.getElementById("tweet-message").value
        const imagedata = document.getElementById('icon-image-file').files[0];
        formData.append("message", message);
        formData.append("files", imagedata);

        const meta = {
            method: "POST",
            body: formData
        }

        const res = await fetch(`https://localhost:5001/poketwitter/${user.username}`, meta)
        const data = await res.json()

        const newTweetFeed = [data, ... tweets]

        setTweets(newTweetFeed)
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
                <Grid container>
                    <Grid item xs={1}>
                        
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container columnSpacing={5} >
                            <Grid item xs={1}>
                                <label htmlFor="icon-image-file" onChange={(e) => checkFile(e)}>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <ImageOutlinedIcon fontSize="medium" />
                                    </IconButton>
                                    <Input accept="image/*" id="icon-image-file" onChange={(e) => checkFile(e)} type="file" />
                                </label>
                            </Grid>
                            <Grid item  xs={1}>
                                <label htmlFor="icon-gif-file">
                                    <IconButton color="primary" >
                                    <GifOutlinedIcon fontSize="small" style={{ border: "2px solid #1DA1F2", borderRadius: "5px 5px 5px 5px"}} />
                                </IconButton>
                                    <Input accept="image/*" id="icon-gif-file" type="file" />
                                </label>
                            </Grid>
                            <Grid item xs={1}>
                                <label htmlFor="icon-chart-file">
                                    <IconButton color="primary" >
                                        <BarChartIcon fontSize="medium" />
                                    </IconButton>
                                    <Input accept="image/*" id="icon-chart-file" type="file" />
                                </label>
                            </Grid>
                            <Grid item xs={1}>
                                <label htmlFor="icon-emoji-file">
                                    <IconButton color="primary" >
                                        <SentimentSatisfiedOutlinedIcon fontSize="medium" />
                                    </IconButton>
                                    <Input accept="image/*" id="icon-emoji-file" type="file" />
                                </label>
                            </Grid>
                            <Grid item xs={1}>
                                <label htmlFor="icon-calendar-file">
                                    <IconButton color="primary" >
                                        <EventOutlinedIcon fontSize="medium" />
                                    </IconButton>
                                    <Input accept="image/*" id="icon-calendar-file"  type="file" />
                                </label>
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
