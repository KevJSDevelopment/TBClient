import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Grid, Icon, IconButton, makeStyles, Popover, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { color } from '@mui/system';

const TweetContainer = ({ loggedInUser, tweet, textColor, backgroundColor, tweets, getTweets, index}) => {

    const [tweetUser, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [tweetIsLikedByUser, setTweetIsLikedByUser] = useState(false)
    const [likes, setLikes] = useState([])
    const [tweetIsRetweetedByUser, setTweetIsRetweetedByUser] = useState(false)
    const [retweets, setRetweets] = useState([])
    const [quoteTweets, setQuoteTweets] = useState([])

    const getTweetUser = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.userId}`);
        const data = await res.json();

       setUser(data);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = async () => {

        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: tweet.userId, tweetId: tweet.tweetId})
        }

        await fetch(`https://localhost:5001/poketwitter/liketweet/${loggedInUser.userId}`, meta);

        getLikes()
        checkLike()
    }

    const checkLike = async () => {
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: tweet.userId, tweetId: tweet.tweetId})
        }
        const res = await fetch(`https://localhost:5001/poketwitter/checklike/${loggedInUser.userId}`, meta);

        const data = await res.json()

        if(!data.Status){
            setTweetIsLikedByUser(true)
        }
        else if(data.Status == 204){
            setTweetIsLikedByUser(false)
        }
        else {
            alert(data.error)
        }

    }

    const getLikes = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/likes/${tweet.tweetId}`);

        const data = await res.json()

        setLikes(data)
    }


    const handleRetweet = async () => {

        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: tweet.userId, tweetId: tweet.tweetId})
        }

        await fetch(`https://localhost:5001/poketwitter/retweets/${loggedInUser.userId}`, meta);

        checkRetweet()
        getRetweets()
    }

    const checkRetweet = async () => {
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: tweet.userId, tweetId: tweet.tweetId})
        }
        const res = await fetch(`https://localhost:5001/poketwitter/checkretweet/${loggedInUser.userId}`, meta);

        const data = await res.json()

        console.log(data.Status)

        if(!data.Status){
            setTweetIsRetweetedByUser(true)
        }
        else if(data.Status == 204){
            setTweetIsRetweetedByUser(false)
        }
        else {
            alert(data.error)
        }

    }

    const getRetweets = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/retweets/${tweet.tweetId}`);

        const data = await res.json()

        setRetweets(data)
    }

    const handleQuoteTweet = () => {
        
    }

    const getQuoteTweets = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/quotetweets/${tweet.tweetId}`);

        const data = await res.json()

        setQuoteTweets(data)
    }

    const deleteTweet = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.tweetId}`, { method: 'DELETE' });

        getTweets();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getTweetUser()
    }, [tweets])

    useEffect(() => {
        checkLike()
        checkRetweet()
        getLikes()
        getRetweets()
        getQuoteTweets()
    }, [])


    return (
        <Card id={`tweet-${tweet.id}`} className={index == 0 ? "tweet-card-0" : "tweet-card"} elevation={0} style={{backgroundColor: backgroundColor}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            {tweetUser ? <Avatar src={`data:image/jpg;base64, ${tweetUser.imageFiles}`} sx={{ width: 56, height: 56}} /> : null}
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container >
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
                                    <IconButton id={`tweet-options-${tweet.id}`} color="primary" onClick={handleClick} className="options-button">
                                        <Typography color="InfoText" className="options-text">
                                            ...
                                        </Typography>
                                    </IconButton>
                                    <Popover id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                            }}>
                                        <Button variant="contained" color="error" onClick={deleteTweet}>
                                            <DeleteOutlinedIcon />
                                            Delete
                                        </Button>
                                    </Popover>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color={textColor} variant="inherit" className="tweet-body">
                                        {tweet.message}
                                    </Typography> 
                                    {tweet.media ? <img src={`data:image/jpg;base64, ${tweet.media}`} className="tweet-image" /> : null } 
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            {/* <IconButton >
                                                <CatchingPokemonIcon fontSize="small" />
                                            </IconButton> */}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={handleQuoteTweet} sx={{":hover": {color: "#1DA1F2"}}} >
                                                <ModeCommentOutlinedIcon fontSize="small" />
                                                <Typography variant="tweetInteractions" >
                                                        {quoteTweets.length !== 0 ? quoteTweets.length : null}
                                                </Typography>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {tweetIsRetweetedByUser ? 
                                                <IconButton onClick={handleRetweet}>
                                                    <RepeatRoundedIcon style={{fill: "lightseagreen"}} fontSize="small" />
                                                    <Typography variant="tweetInteractions" color="lightseagreen" >
                                                        {retweets.length !== 0 ? retweets.length : null}
                                                    </Typography>
                                                </IconButton>
                                                :
                                                <IconButton sx={{":hover": {color: "lightseagreen"}}} onClick={handleRetweet}>
                                                    <RepeatRoundedIcon fontSize="small" />
                                                    <Typography variant="tweetInteractions" >
                                                        {retweets.length !== 0 ? retweets.length : null}
                                                    </Typography>
                                                </IconButton>
                                            }
                                        </Grid>
                                        <Grid item xs={2}>
                                                {tweetIsLikedByUser ? 
                                                    <IconButton onClick={handleLike}>
                                                        <FavoriteIcon style={{fill: "#f50057"}} fontSize="small"  /> 
                                                        <Typography variant="tweetInteractions" color="#f50057" >
                                                            {likes.length}
                                                        </Typography>
                                                    </IconButton>
                                                    : 
                                                    <IconButton sx={{":hover": {color: "#f50057"}}} onClick={handleLike}>
                                                        <FavoriteBorderIcon fontSize="small" />
                                                        <Typography variant="tweetInteractions" >
                                                            {likes.length !== 0 ? likes.length : null}
                                                        </Typography>
                                                    </IconButton>
                                                }
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton >
                                                <IosShareOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default TweetContainer
