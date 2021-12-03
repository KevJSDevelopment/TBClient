import React, { useEffect, useState } from 'react'
import { Avatar, Backdrop, Button, Card, Fade, Grid, IconButton, Input, Link, Modal, Popover, TextField, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import NewTweetModal from '../HomeComponents/NewTweetModal';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifOutlinedIcon from '@mui/icons-material/GifOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -125%)',
    width: 550,
    boxShadow: 24
  };

const ViewTweetContainer = ({ handleProfileView, handleViewTweet, loggedInUser, tweet, textColor, backgroundColor, tweets, getTweets, index}) => {

    const [tweetUser, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [tweetIsLikedByUser, setTweetIsLikedByUser] = useState(false)
    const [likes, setLikes] = useState([])
    const [tweetIsRetweetedByUser, setTweetIsRetweetedByUser] = useState(false)
    const [retweets, setRetweets] = useState([])
    const [replies, setReplies] = useState([])
    const [replyOpen, setReplyOpen] = useState(false);
    const [tweetDisabled, setTweetDisabled] = useState(true)
    const [replyFieldFocus, setReplyFieldFocus] = useState(false)

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
        else if(data.Status===204){
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
        else if(data.Status===204){
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

    const getreplies = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/replies/${tweet.tweetId}`);

        const data = await res.json()

        setReplies(data)
    }

    const deleteTweet = async (e) => {
        e.stopPropagation();
        await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.tweetId}`, { method: 'DELETE' });

        getTweets()
    };

    const checkText = (value) => {

        if(value !== ''){
            setTweetDisabled(false)
        }

        else setTweetDisabled(true)

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

        const res = await fetch(`https://localhost:5001/poketwitter/${loggedInUser.username}`, meta)
        await res.json()

        getTweets()
    }

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
        getreplies()
    }, [tweet])


    return (
        <Card onClick={(e) => handleViewTweet(e, tweet.tweetId)} elevation={0} style={{backgroundColor: backgroundColor}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2} >
                        <Grid item xs={1}>
                            {tweetUser ? <Avatar onClick={(e) => handleProfileView(e, tweetUser)} src={`data:image/jpg;base64, ${tweetUser.imageFiles}`} sx={{ width: 56, height: 56, ":hover": {width: 58, height: 58, border: '3px solid #1DA1F2', transform: 'translate(-7%, -7%)',  cursor: 'pointer' }}} /> : null}
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container >
                                <Grid item xs={6}>
                                    {tweetUser ? 
                                        <div className="signature" > 
                                            <Typography onClick={(e) => handleProfileView(e, tweetUser)} color={textColor} variant="inherit" className="display-name"> 
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
                                    <IconButton color="primary" onClick={(e) => handleDeleteClick(e)} className="options-button">
                                        <Typography className={backgroundColor==="white" ? "options-text" : "dark-options-text"}>
                                            ...
                                        </Typography>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color={textColor} variant="inherit" className="tweet-body">
                                {tweet.message}
                            </Typography> 
                            {tweet.media ? <img src={`data:image/jpg;base64, ${tweet.media}`} className="reply-image" /> : null } 
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={backgroundColor==="white" ? "view-tweet-section" : "dark-view-tweet-section"} >
                                <Grid item xs={4} display="flex">
                                    <Typography className={backgroundColor==="white" ? "view-tweet-count" : "dark-view-tweet-count"} >
                                        {replies.length !== 0 ? replies.length : null}
                                    </Typography>
                                    <Typography className={ backgroundColor==="white" ? "detail-text": "dark-detail-text"}>
                                            Quote Tweets
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} display="flex">
                                    <Typography className={backgroundColor==="white" ? "view-tweet-count" : "dark-view-tweet-count"} >
                                        {retweets.length !== 0 ? retweets.length : null}
                                    </Typography>
                                    <Typography className={ backgroundColor==="white" ? "detail-text": "dark-detail-text"}>
                                            Retweets
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} display="flex">
                                    <Typography className={backgroundColor==="white" ? "view-tweet-count" : "dark-view-tweet-count"}>
                                        {likes.length !== 0 ? likes.length : null}
                                    </Typography>
                                    <Typography className={ backgroundColor==="white" ? "detail-text": "dark-detail-text"}>
                                        Likes
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={backgroundColor==="white" ? "view-tweet-section" : "dark-view-tweet-section"}  >
                                <Grid item xs={2}>
                                    <IconButton onClick={(e) => e.stopPropagation()} sx={backgroundColor==="white" ? {":hover": {color: "violet" }} :  {color:'dimgrey', ":hover": {color: "violet" }}}>
                                        <CatchingPokemonIcon fontSize="medium" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={(e) => handleReplyOpen(e)} sx={backgroundColor==="white" ? {":hover": {color: "#1DA1F2"}} : {color:'dimgrey', ":hover": {color: "#1DA1F2"}}} >
                                        <ModeCommentOutlinedIcon fontSize="medium" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={2}>
                                    {tweetIsRetweetedByUser ? 
                                        <IconButton sx={{color: "lightseagreen"}} onClick={(e) =>handleRetweet(e)}>
                                            <RepeatRoundedIcon fontSize="medium" />
                                        </IconButton>
                                        :
                                        <IconButton sx={backgroundColor==="white" ? {":hover": {color: "lightseagreen"}} : {color:'dimgrey', ":hover": {color: "lightseagreen"}}} onClick={(e) =>handleRetweet(e)}>
                                            <RepeatRoundedIcon fontSize="medium" />
                                        </IconButton>
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                        {tweetIsLikedByUser ? 
                                            <IconButton sx={{color: "#f50057"}} onClick={(e) =>handleLike(e)}>
                                                <FavoriteIcon fontSize="medium"  /> 
                                            </IconButton>
                                            : 
                                            <IconButton sx={backgroundColor==="white" ? {":hover": {color: "#f50057"}} : {color:'dimgrey', ":hover": {color: "#f50057"}}} onClick={(e) =>handleLike(e)}>
                                                <FavoriteBorderIcon fontSize="medium" />
                                            </IconButton>
                                        }
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={(e) => e.stopPropagation()} sx={backgroundColor==="white" ? {":hover": {color: "#1DA1F2"}} : {color:'dimgrey', ":hover": {color: "#1DA1F2"}}} >
                                        <IosShareOutlinedIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={backgroundColor==="white" ? "view-tweet-section" : "dark-view-tweet-section"}  spacing={1}>
                            {replyFieldFocus ? 
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography style={{display: "flex"}} color="">
                                                    Replying to 
                                                        <Typography color="primary" className="username-profile-link">
                                                            <Link underline="hover">
                                                                @{tweetUser.username}
                                                            </Link>
                                                        </Typography>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                : null}
                                <Grid item xs={1}>
                                    {loggedInUser ? <Avatar variant="circular" sx={{ width: 56, height: 56}} src={`data:image/jpg;base64, ${loggedInUser.imageFiles}`} /> : null}
                                </Grid>
                                <Grid item xs={11}>
                                    <TextField id={textColor==="black" ? "tweet-message" : "dark-tweet-message"}  onFocus={() => setReplyFieldFocus(true)} autoComplete='off' className="tweet-text" onChange={(e) => checkText(e.target.value)} placeholder="What's Happening?" variant="standard" />
                                </Grid>
                                {replyFieldFocus ? 
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
                                                <Button variant="contained" disabled={tweetDisabled} onClick={sendTweet} color="primary" className="button tweet-2">
                                                    Tweet
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid> 
                                : null}
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
                BackdropProps={{timeout: 500, sx: backgroundColor==="white" ? {backgroundColor: "rgba(0, 0, 0, 0.5)" } : {backgroundColor: "rgba(255, 255, 255, 0.1)" }}}
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

export default ViewTweetContainer