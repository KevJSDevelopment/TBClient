import React, { useEffect, useState } from 'react'
import { Avatar, Card, Grid, IconButton, makeStyles, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const TweetContainer = ({ tweet }) => {

    const [user, setUser] = useState(null)
    const getTweetUser = async () => {
        const res = await fetch(`https://localhost:5001/poketwitter/tweets/${tweet.userId}`)
        const data = await res.json()

       setUser(data)
    }

    useEffect(() => {
        getTweetUser()
    }, [])

    return (
        <Card className="tweet-card" elevation={0}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                            {user ? <Avatar src={`data:image/jpg;base64, ${user.imageFiles}`} /> : null}
                        </Grid>
                        <Grid item xs={11}>
                            <Grid container>
                                <Grid item xs={12}>
                                    {user ? 
                                        <div className="signature"> 
                                            <Typography className="display-name"> 
                                                {user.displayName} 
                                            </Typography> 
                                            <Typography className="user-name">
                                                @{user.username} 
                                            </Typography>
                                        </div>: null}
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={`data:image/jpg;base64, ${tweet.media}`} className="tweet-image" />
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
