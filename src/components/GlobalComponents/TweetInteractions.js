import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

const TweetInteractions = ({handleReplyOpen, backgroundColor, replies, retweets, likes, handleRetweet, handleLike, tweetIsLikedByUser, tweetIsRetweetedByUser}) => {
    return (
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={2}>
                    <IconButton onClick={(e) => e.stopPropagation()} sx={backgroundColor==="white" ? {":hover": {color: "violet" }} :  {color:'dimgrey', ":hover": {color: "violet" }}}>
                        <CatchingPokemonIcon fontSize="small" />
                    </IconButton>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={(e) => handleReplyOpen(e)} sx={backgroundColor==="white" ? {":hover": {color: "#1DA1F2"}} : {color:'dimgrey', ":hover": {color: "#1DA1F2"}}} >
                        <ModeCommentOutlinedIcon fontSize="small" />
                        <Typography variant="tweetInteractions" >
                                {replies.length !== 0 ? replies.length : null}
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
                        <IconButton sx={backgroundColor==="white" ? {":hover": {color: "lightseagreen"}} : {color:'dimgrey', ":hover": {color: "lightseagreen"}}} onClick={(e) =>handleRetweet(e)}>
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
                            <IconButton sx={backgroundColor==="white" ? {":hover": {color: "#f50057"}} : {color:'dimgrey', ":hover": {color: "#f50057"}}} onClick={(e) =>handleLike(e)}>
                                <FavoriteBorderIcon fontSize="small" />
                                <Typography variant="tweetInteractions" >
                                    {likes.length !== 0 ? likes.length : null}
                                </Typography>
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
    )
}

export default TweetInteractions
