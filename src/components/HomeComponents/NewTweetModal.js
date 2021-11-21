import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const NewTweetModal = ({ textColor, loggedInUser, getTweets, tweet, tweetUser }) => {

    const Input = styled('input')({
        display: 'none',
    });

    const [tweetDisabled, setTweetDisabled] = useState(true)

    const checkText = (value) => {

        if(value !== ''){
            setTweetDisabled(false)
        }

        else setTweetDisabled(true)

    }

    const sendReply = async () => {
        const formData = new FormData();

        let message; 
        
        if(document.getElementById("reply-message")) message = document.getElementById("reply-message").value
        else message = document.getElementById("dark-reply-message").value


        const imagedata = document.getElementById('icon-image-file').files[0];
        formData.append("message", message);
        formData.append("files", imagedata);
        formData.append("tweetId", tweet.tweetId);
        

        const meta = {
            method: "POST",
            body: formData
        }

        const res = await fetch(`http://localhost:5000/poketwitter/quotetweet/${tweet.tweetId}`, meta)
        const data = await res.json()

        debugger

        getTweets()
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{borderBottom: "1px solid dimgrey", padding: "0px"}}>
                <IconButton >
                    <CloseIcon />
                </IconButton>
            </Grid>
            <Grid item xs={2}>
                {tweetUser ? <Avatar src={`data:image/jpg;base64, ${tweetUser.imageFiles}`} sx={{ width: 56, height: 56}} /> : null}
            </Grid>
            <Grid item xs={10}>
                {tweetUser ? 
                    <div className="signature" > 
                        <Typography color={textColor} variant="inherit" className="display-name"> 
                            {tweetUser.displayName} 
                        </Typography> 
                        <Typography variant="inherit" id="at-sign">
                            @
                        </Typography>
                        <Typography variant="inherit" className="user-name">
                            {tweetUser.username} 
                        </Typography>
                    </div>
                    : null}
            </Grid>
            <Grid item xs={1} style={{borderRight: "2px solid dimgrey"}}>
            </Grid>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
                <Typography color={textColor} variant="inherit" className="tweet-body">
                    {tweet.message}
                </Typography> 
            </Grid>
            <Grid item xs={12} className="reply-message-box">
                <Grid container alignItems="center">
                    <Grid item xs={2}>
                        {loggedInUser ? <Avatar variant="circular" sx={{ width: 56, height: 56}} src={`data:image/jpg;base64, ${loggedInUser.imageFiles}`} /> : null}
                    </Grid>
                    <Grid item xs={10}>
                        <TextField id={textColor == "black" ? "reply-message" : "dark-reply-message"} className="tweet-text" onChange={(e) => checkText(e.target.value)} placeholder="What's Happening?" variant="standard" />
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
                                <label htmlFor="icon-image-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <ImageOutlinedIcon fontSize="medium" />
                                    </IconButton>
                                    <Input accept="image/*" id="icon-image-file" type="file" />
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
                        <Button variant="contained" disabled={tweetDisabled} onClick={sendReply} color="primary" className="button tweet-2">
                            Reply
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewTweetModal
