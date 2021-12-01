import { Avatar, Backdrop, Button, Card, Fade, Grid, IconButton, Modal, Popover, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TweetInteractions from '../GlobalComponents/TweetInteractions';
import NewTweetModal from '../HomeComponents/NewTweetModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -125%)',
    width: 550,
    boxShadow: 24
  };
const ViewReplyContainer = ({ handleProfileView, handleViewTweet, loggedInUser, backgroundColor, getTweets, textColor, reply}) => {

    const [user, setUser] = useState(false);
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
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${reply.userId}`);
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
            body: JSON.stringify({ userId: reply.userId, tweetId: reply.tweetId})
        }
    
        await fetch(`https://localhost:5001/poketwitter/liketweet/${loggedInUser.userId}`, meta);
    
        getLikes()
        checkLike()
    }
    
    const checkLike = async () => {
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: reply.userId, tweetId: reply.tweetId})
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
        const res = await fetch(`https://localhost:5001/poketwitter/likes/${reply.tweetId}`);
    
        const data = await res.json()
    
        setLikes(data)
    }
    
    
    const handleRetweet = async (e) => {
        e.stopPropagation();
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: reply.userId, tweetId: reply.tweetId})
        }
    
        await fetch(`https://localhost:5001/poketwitter/retweets/${loggedInUser.userId}`, meta);
    
        checkRetweet()
        getRetweets()
    }
    
    const checkRetweet = async () => {
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: reply.userId, tweetId: reply.tweetId})
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
        const res = await fetch(`https://localhost:5001/poketwitter/retweets/${reply.tweetId}`);
    
        const data = await res.json()
    
        setRetweets(data)
    }
    
    
    const getTweetReplies = async () => {
    
        const res = await fetch(`https://localhost:5001/poketwitter/replies/${reply.tweetId}`);
    
        const data = await res.json()
    
        setTweetReplies(data)
    }
    
    const deleteTweet = async (e) => {
        e.stopPropagation();
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${reply.tweetId}`, { method: 'DELETE' });
    
        getTweets()
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getTweetUser()
        getTweetReplies()
    }, [])

    return (
        <Grid container spacing={2} id={`reply-${reply.quoteTweetId}`} className={backgroundColor == "white" ? "tweet-card" : "dark-tweet-card"} onClick={(e) => handleViewTweet(e, reply.tweetId)} style={{backgroundColor: backgroundColor}} >
            <Grid item xs={1}>
                {user ? <Avatar onClick={(e) => handleProfileView(e, user)} src={`data:image/jpg;base64, ${user.imageFiles}`} sx={{ width: 56, height: 56}} /> : null}
            </Grid>
            <Grid item xs={11}>
                <Grid container>
                    <Grid item xs={6}>
                        {user ? 
                            <div className="signature" onClick={(e) => handleProfileView(e, user)}> 
                                <Typography color={textColor} variant="inherit" className="display-name"> 
                                    {user.displayName} 
                                </Typography> 
                                <Typography variant="inherit" id="at-sign">
                                    @
                                </Typography>
                                <Typography variant="inherit" className="user-name">
                                    {user.username} 
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
                </Grid>
                <Grid item xs={12}>
                    <Typography color={textColor} variant="inherit" className="tweet-body">
                        {reply.message}
                    </Typography>
                    {reply.media ? <img src={`data:image/jpg;base64, ${reply.media}`} className="unviewed-reply-image" /> : null } 
                </Grid>
            </Grid>
            <TweetInteractions handleReplyOpen={handleReplyOpen} backgroundColor={backgroundColor} replies={replies} retweets={retweets} likes={likes} handleRetweet={handleRetweet} handleLike={handleLike} tweetIsLikedByUser={tweetIsLikedByUser} tweetIsRetweetedByUser={tweetIsRetweetedByUser} />
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
                    <NewTweetModal getTweets={getTweets} tweetUser={user} tweet={reply} textColor={textColor} loggedInUser={loggedInUser} getTweets={getTweets} />
                </Card>
                </Fade>
            </Modal>
        </Grid>
    )
}

export default ViewReplyContainer
