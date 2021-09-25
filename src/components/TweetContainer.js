import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Grid, Icon, IconButton, makeStyles, Popover, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const TweetContainer = ({ tweet, textColor, backgroundColor }) => {

    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);

    const getTweetUser = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.userId}`)
        const data = await res.json()

       setUser(data)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteTweet = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.id}`, { method: 'DELETE' })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getTweetUser()
    }, [])

    return (
        <Card id={`tweet-${tweet.id}`} className="tweet-card" elevation={0} style={{backgroundColor: backgroundColor}}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            {user ? <Avatar src={`data:image/jpg;base64, ${user.imageFiles}`} /> : null}
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container >
                                <Grid item xs={6}>
                                    {user ? 
                                        <div className="signature" > 
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
                                        <Grid item xs={3}>
                                            <IconButton >
                                                <ModeCommentOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton >
                                                <RepeatRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <IconButton >
                                                <FavoriteBorderIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={3}>
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
