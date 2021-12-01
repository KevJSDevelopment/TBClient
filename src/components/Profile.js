import { Avatar, Card, CardActions, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './GlobalComponents/Header'
import defaultBackground from '../images/Default-background.png'
import TweetContainer from './HomeComponents/TweetContainer'
import { useParams } from 'react-router'


const TweetTypes = ['Tweets', 'Tweets&Replies', 'Media', 'Likes'];

const Profile = ({ profile, setProfile, textColor, backgroundColor, handleProfileView, handleViewTweet, loggedInUser }) => {

    const [value, setValue] = useState(0);
    const [tweetCollection, setTweetCollection] = useState([])
    const [tweetCollectionType, setTweetCollectionType] = useState('Tweets')
    const { username } = useParams();

    const handleChange = (e, newValue) => {
        setValue(newValue)
        setTweetCollectionType(TweetTypes[newValue])
    };

    const setProfileUser = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/${username}`);

        const data = await res.json()

        setProfile(data)
    }

    const getListOfTweetsToDisplay = (type) => {
        switch (type) {
            case 'Tweets':
                getUserTweets()
                break;
            case 'Tweets&Replies':
                getUserTweetsAndReplies()
                break;
            case 'Media':
                getUserMediaTweets()
                break;
            case 'Likes':
                getUserLikedTweets()
                break;    
            default:
                break;
        }
    }

    const getTweets = () => {

        getListOfTweetsToDisplay(tweetCollectionType);


        
    }

    const getUserTweets = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/profile/tweets/${username}`);

        const data = await res.json()

        setTweetCollection(data)
    }

    const getUserTweetsAndReplies = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/profile/tweets+replies/${username}`);

        const data = await res.json()

        setTweetCollection(data)
    }

    const getUserMediaTweets = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/profile/media/${username}`);

        const data = await res.json()

        setTweetCollection(data)
    }

    const getUserLikedTweets = async () => {
        const res = await fetch(`http://localhost:5000/poketwitter/profile/likes/${username}`);

        const data = await res.json()

        setTweetCollection(data)
    }

    useEffect(() => {
        setProfileUser()
    }, [])

    useEffect(() => {
        getListOfTweetsToDisplay(tweetCollectionType)
    }, [tweetCollectionType])
    
    return (
        <Grid container>
            <Grid item xs={12}>
                <Header text={profile.displayName} textColor={textColor} backButton={true} />
            </Grid>
            <Grid item xs={12}>
                <Card sx={{ maxWidth: "100%", maxHeight:"100%", borderRadius: 0, backgroundColor: backgroundColor }}>
                    <Grid container>

                    </Grid>
                    <Grid item xs={12}>
                        <CardMedia
                            sx={{maxHeight: "200px"}}
                            component="img"
                            alt="Background"
                            src={profile.backgroundImage ? `data:image/jpg;base64, ${profile.backgroundImage}` : defaultBackground }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent sx={{transform: "translate(0%, -25%)"}}>
                            <Avatar sx={{ width: 96, height: 96, border: `5px solid ${backgroundColor}`}} src={`data:image/jpg;base64, ${profile.imageFiles}`} />
                            <div style={{display: "flex"}}>
                                <Typography color={textColor} variant="inherit" className="display-name"> 
                                    {profile.displayName} 
                                </Typography> 
                                <Typography variant="inherit" id="at-sign">
                                    @
                                </Typography>
                                <Typography variant="inherit" className="user-name">
                                    {profile.username} 
                                </Typography>
                            </div>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent style={{display: "flex"}}>
                            <Typography variant="inherit" color={textColor}>
                                {profile.bio}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent style={{display: "flex"}}>
                            <Typography variant="inherit" color={textColor}>
                                Following
                            </Typography>
                            <Typography variant="inherit" color={textColor}>
                                Followers
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid itex xs={12}>
                        <CardActions>
                            <Tabs indicatorColor="primary" variant="fullWidth" sx={{width: "100%"}} value={value} onChange={(e, value) => handleChange(e, value)}>
                                <Tab sx={{color: textColor}} label="Tweets"  onClick={() => console.log("Profile/Tweets")} />
                                <Tab sx={{color: textColor}} label="Tweets+Replies" onClick={() => console.log("Tweets+Replies")} />
                                <Tab sx={{color: textColor}} label="Media" onClick={() => console.log("Media")} />
                                <Tab sx={{color: textColor}} label="Likes" onClick={() => console.log("Likes")} />
                            </Tabs>
                        </CardActions>
                    </Grid>
                    <Grid item xs={12}>
                        {tweetCollection.map((tweet, index) => {
                            return <TweetContainer handleProfileView={handleProfileView} handleViewTweet={handleViewTweet} loggedInUser={loggedInUser} textColor={textColor} backgroundColor={backgroundColor} tweets={tweetCollection} getTweets={getTweets} tweet={tweet} index={index} key={index} />
                        })}
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Profile
