import React, { useEffect, useState } from 'react'
import { Avatar, Backdrop, Button, Card, Fade, Grid, IconButton, Modal, Popover, Typography } from '@mui/material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NewTweetModal from './NewTweetModal';
import TweetInteractions from '../GlobalComponents/TweetInteractions';

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
    const [replies, setTweetReplies] = useState([])
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

        debugger
    
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
        debugger

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
    
    
    const getTweetReplies = async () => {
    
        const res = await fetch(`https://localhost:5001/poketwitter/replies/${tweet.tweetId}`);
    
        const data = await res.json()
    
        setTweetReplies(data)
    }
    
    const deleteTweet = async (e) => {
        e.stopPropagation();
        await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.tweetId}`, { method: 'DELETE' });
    
        getTweets()
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getTweetUser()
        checkLike()
        checkRetweet()
        getTweetReplies()
        getLikes()
        getRetweets()
    }, [tweets])

    return (
        <Card id={`tweet-${tweet.id}`} className={backgroundColor==="white" ? index===0 ? "tweet-card-0" : "tweet-card" : index===0 ? "dark-tweet-card-0" : "dark-tweet-card"} onClick={(e) => handleViewTweet(e, tweet.tweetId)} elevation={0} style={{backgroundColor: backgroundColor}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            {tweetUser ? <Avatar onClick={(e) => handleProfileView(e, tweetUser)} src={`data:image/jpg;base64, ${tweetUser.imageFiles}`} sx={{ width: 56, height: 56, ":hover": {width: 58, height: 58, border: '3px solid #1DA1F2', transform: 'translate(-6%, -6%)',  cursor: 'pointer' }}} /> : null}
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
                                <TweetInteractions handleReplyOpen={handleReplyOpen} backgroundColor={backgroundColor} replies={replies} retweets={retweets} likes={likes} handleRetweet={handleRetweet} handleLike={handleLike} tweetIsLikedByUser={tweetIsLikedByUser} tweetIsRetweetedByUser={tweetIsRetweetedByUser} />
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
                    <NewTweetModal getTweets={getTweets} tweetUser={tweetUser} tweet={tweet} textColor={textColor} loggedInUser={loggedInUser} />
                </Card>
                </Fade>
            </Modal>
        </Card>
    )
}

export default TweetContainer
