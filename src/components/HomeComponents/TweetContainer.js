import React, { useEffect, useState } from 'react'
import { Avatar, Backdrop, Button, Card, Fade, Grid, IconButton, Modal, Popover, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, color } from '@mui/system';
import NewTweetModal from './NewTweetModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -125%)',
    width: 550,
    boxShadow: 24
  };

const TweetContainer = ({ handleProfileView, handleViewTweet, loggedInUser, tweet, textColor, backgroundColor, tweets, getTweets, index}) => {

    const [tweetUser, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [tweetIsLikedByUser, setTweetIsLikedByUser] = useState(false)
    const [likes, setLikes] = useState([])
    const [tweetIsRetweetedByUser, setTweetIsRetweetedByUser] = useState(false)
    const [retweets, setRetweets] = useState([])
    const [quoteTweets, setQuoteTweets] = useState([])
    const [replyOpen, setReplyOpen] = useState(false);

    const handleReplyOpen = (e) => {
        e.stopPropagation();
        setReplyOpen(true);
    }
    const handleReplyClose = (e) => {
        e.stopPropagation();
        setReplyOpen(false);
    }

    const getTweetUser = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.userId}`);
        const data = await res.json();

       setUser(data);
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleDeleteClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const handleLike = async (e) => {
        e.stopPropagation();
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


    const handleRetweet = async (e) => {
        e.stopPropagation();
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

    const getQuoteTweets = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/quotetweets/${tweet.tweetId}`);

        const data = await res.json()

        setQuoteTweets(data)
    }

    const deleteTweet = async (e) => {
        e.stopPropagation();
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
        <Card id={`tweet-${tweet.id}`} className={backgroundColor == "white" ? index == 0 ? "tweet-card-0" : "tweet-card" : index == 0 ? "dark-tweet-card-0" : "dark-tweet-card"} onClick={(e) => handleViewTweet(e, tweet.tweetId)} elevation={0} style={{backgroundColor: backgroundColor}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        <Grid item xs={1}>
                            {tweetUser ? <Avatar onClick={(e) => handleProfileView(e)} src={`data:image/jpg;base64, ${tweetUser.imageFiles}`} sx={{ width: 56, height: 56}} /> : null}
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container >
                                <Grid item xs={6}>
                                    {tweetUser ? 
                                        <div className="signature" onClick={(e) => handleProfileView(e)}> 
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
                                    <IconButton id={`tweet-options-${tweet.id}`} color="primary" onClick={(e) => handleDeleteClick(e)} className="options-button">
                                        <Typography color="InfoText" className="options-text">
                                            ...
                                        </Typography>
                                    </IconButton>
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
                                            <IconButton onClick={(e) => e.stopPropagation()} sx={backgroundColor == "white" ? {":hover": {color: "violet" }} :  {color:'dimgrey', ":hover": {color: "violet" }}}>
                                                <CatchingPokemonIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={(e) => handleReplyOpen(e)} sx={backgroundColor == "white" ? {":hover": {color: "#1DA1F2"}} : {color:'dimgrey', ":hover": {color: "#1DA1F2"}}} >
                                                <ModeCommentOutlinedIcon fontSize="small" />
                                                <Typography variant="tweetInteractions" >
                                                        {quoteTweets.length !== 0 ? quoteTweets.length : null}
                                                </Typography>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {tweetIsRetweetedByUser ? 
                                                <IconButton sx={{color: "lightseagreen"}} onClick={(e) =>handleRetweet(e)}>
                                                    <RepeatRoundedIcon fontSize="small" />
                                                    <Typography variant="tweetInteractions" color="lightseagreen" >
                                                        {retweets.length !== 0 ? retweets.length : null}
                                                    </Typography>
                                                </IconButton>
                                                :
                                                <IconButton sx={backgroundColor == "white" ? {":hover": {color: "lightseagreen"}} : {color:'dimgrey', ":hover": {color: "lightseagreen"}}} onClick={(e) =>handleRetweet(e)}>
                                                    <RepeatRoundedIcon fontSize="small" />
                                                    <Typography variant="tweetInteractions" >
                                                        {retweets.length !== 0 ? retweets.length : null}
                                                    </Typography>
                                                </IconButton>
                                            }
                                        </Grid>
                                        <Grid item xs={2}>
                                                {tweetIsLikedByUser ? 
                                                    <IconButton sx={{color: "#f50057"}} onClick={(e) =>handleLike(e)}>
                                                        <FavoriteIcon fontSize="small"  /> 
                                                        <Typography variant="tweetInteractions" color="#f50057" >
                                                            {likes.length}
                                                        </Typography>
                                                    </IconButton>
                                                    : 
                                                    <IconButton sx={backgroundColor == "white" ? {":hover": {color: "#f50057"}} : {color:'dimgrey', ":hover": {color: "#f50057"}}} onClick={(e) =>handleLike(e)}>
                                                        <FavoriteBorderIcon fontSize="small" />
                                                        <Typography variant="tweetInteractions" >
                                                            {likes.length !== 0 ? likes.length : null}
                                                        </Typography>
                                                    </IconButton>
                                                }
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton onClick={(e) => e.stopPropagation()} sx={backgroundColor == "white" ? {":hover": {color: "#1DA1F2"}} : {color:'dimgrey', ":hover": {color: "#1DA1F2"}}} >
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
            <Popover id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={(e) => handleDeleteClose(e)}
                onClick={(e) => e.stopPropagation()}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}>
                <Button variant="contained" color="error" onClick={(e) => deleteTweet(e)}>
                    <DeleteOutlinedIcon />
                    Delete
                </Button>
            </Popover>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={replyOpen}
                onClose={handleReplyClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                onClick={(e) => e.stopPropagation()}
                BackdropProps={{timeout: 500, sx: backgroundColor == "white" ? {backgroundColor: "rgba(0, 0, 0, 0.5)" } : {backgroundColor: "rgba(255, 255, 255, 0.1)" }}}
            >
                <Fade in={replyOpen}>
                <Card elevation={0} style={{backgroundColor: backgroundColor}} sx={style}>
                    <NewTweetModal tweetUser={tweetUser} tweet={tweet} textColor={textColor} loggedInUser={loggedInUser} getTweets={getTweets} />
                </Card>
                </Fade>
            </Modal>
        </Card>
    )
}

export default TweetContainer
