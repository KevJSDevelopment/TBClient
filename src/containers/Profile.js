import { Button, Card, CardActions, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import defaultBackground from '../images/Default-background.png'
import TweetContainer from '../components/HomeComponents/TweetContainer'
import { useParams } from 'react-router'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { ethers } from 'ethers'
import { FacebookCircularProgress } from '../components/Loading'
import NFTGallery from '../components/NFTGallery'
import EditProfile from '../components/EditProfile'


const TweetTypes = ['Tweets', 'Tweets&Replies', 'Media', 'Likes'];

const Profile = ({ textColor, backgroundColor, handleProfileView, handleViewTweet, loggedInUser }) => {
    
    const [value, setValue] = useState(0);
    const [profile, setProfile] = useState(false)
    const [tweetCollection, setTweetCollection] = useState([])
    const [tweetCollectionType, setTweetCollectionType] = useState('Tweets')
    const { username } = useParams();
    const [showNftImages, setShowNftImages] = useState(false);
    const [NFTArray, setNFTArray] = useState([])
    const [wallets, setWallets] = useState([])
    const [following, setFollowing] = useState(false)
    const [followersArray, setFollowersArray] = useState([])
    const [followingArray, setFollowingArray] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [nftUrl, setNftUrl] = useState('')

    const addWallet = async () => {
        if(window.ethereum){
            const result = await window.ethereum.request({ method: 'eth_requestAccounts'})
            
            const meta = { 
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ userId: loggedInUser.userId, address: result[0]})
            }
    
            await fetch(`http://localhost:5000/poketwitter/wallets`, meta)
        }
    }

    const sendPayment = async ({ setError, setTxs, ether, addr}) => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = new provider.getSigner();
                ethers.utils.getAddress(addr);
                const tx = await signer.sendTransaction({
                    to: addr,
                    value: ether.utils.parseEther(ether)
                });

                console.log({ ether, addr }) 
                console.log('tx', tx) 
            }   
        } catch (error) {
            setError(error.message);
        }
    }
    
    const openNFTGallery = () => {
        setOpen(true)
    }

    const openEditProfile = () => {
        setEditOpen(true)
    }

    const getNFTs = async () => { 
        let array = [];

        for (let i = 0; i < wallets.length; i++) {
        
            const res = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${wallets[i].address}`);
            const data = await res.json();

            array = [...array, ...data.items];
        }


        setNFTArray(array);

        setTimeout(() => setLoading(false), 250);
    }

    const setImageUrl = (nft) => {

        if(!nft) return;

        for(let i = 0; i < nft.meta.content.length; i++) {
            const length =  nft.meta.content[i].url.length;

            if(nft.meta.content[i].url.substring(0,4) == 'http' && nft.meta.content[i].url.substring(length - 4, length) != '.mp4') {
                return nft.meta.content[i].url;
            }
        };
    }

    const getWallets = async (user) => {

        if(!user) return;

        const res = await fetch(`http://localhost:5000/poketwitter/wallets/${user.username}`);

        const data = await res.json();

        setWallets(data);
    }

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

    const checkIfNFTShown = (user) => {
        setShowNftImages(user.usingNFT)
        if(user.usingNFT) setNftUrl(user.nftProfileImage)
        debugger
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


    const followUser = async () => {
        if(!loggedInUser || !profile) return;
        const meta = { 
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ UserThatFollowedId: loggedInUser.userId, UserBeingFollowedId: profile.userId})
        }

        await fetch(`http://localhost:5000/poketwitter/followers`, meta)

        checkFollowing()
    }

    const unfollowUser = async () => {
        const meta = { 
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ UserThatFollowedId: loggedInUser.userId, UserBeingFollowedId: profile.userId})
        }

        await fetch(`http://localhost:5000/poketwitter/followers`, meta)

        checkFollowing()
    }

    const checkFollowing = async () => {

        if(!profile || !loggedInUser) return;

        const res = await fetch(`http://localhost:5000/poketwitter/followers/${loggedInUser.userId}/${profile.userId}`)

        const data = await res.json()

        if (!data.Status) {
            setFollowing(true);
        } else if (data.Status === 204) {
            setFollowing(false);
        } else {
            alert(data.error);
        }

        const resp = await fetch(`http://localhost:5000/poketwitter/followers/${profile.userId}`)

        const followersData = await resp.json()

        setFollowersArray(followersData)

        const response = await fetch(`http://localhost:5000/poketwitter/following/${profile.userId}`)

        const followingData = await response.json()

        setFollowingArray(followingData)
    }

    useEffect(() => {
        setProfileUser()
    }, [])

    useEffect(() => {
        getListOfTweetsToDisplay(tweetCollectionType)
    }, [tweetCollectionType])

    useEffect(() => {
        if(profile) {
            getWallets(profile)
            checkFollowing()
        }

        return () => {
          setWallets([]);
        }
    }, [profile])
    
    useEffect(() => {
        getNFTs()

        return () => { 
            setNFTArray([]);
        }
    }, [wallets])

    useEffect(() => {

        if(profile) checkIfNFTShown(profile)

        return () => {
            setShowNftImages(false)
        }
    }, [NFTArray, profile])
    
    return (
        <Grid container>
                <Grid item xs={12}>
                    <Header text={profile.displayName} textColor={textColor} backButton={true} />
                </Grid>
                {!loading ? <Grid item xs={12}>
                    <Card sx={{ maxWidth: "100%", maxHeight:"100%", borderRadius: 0, backgroundColor: backgroundColor }}>
                        <Grid item xs={12}>
                            <CardMedia
                                sx={{maxHeight: "200px"}}
                                component="img"
                                alt="Background"
                                src={profile.backgroundImage ? `data:image/jpg;base64, ${profile.backgroundImage}` : defaultBackground }
                            />
                        </Grid>
                        <Grid item xs={12} sx={{transform: "translate(0%, -25%)", marginLeft: '2%', marginRight:'0%', paddingBottom: 0}}>
                            <Grid container>
                                {!showNftImages ?
                                    <Grid item xs={6}>
                                        <img className="profile-image" src={`data:image/jpg;base64, ${profile.imageFiles}`} />
                                    </Grid> 
                                    :
                                    <Grid item xs={6}>
                                        <img className="nft-profile-image" src={nftUrl} />
                                    </Grid>
                                }
                                {loggedInUser.username == profile.username ? 
                                    <Grid item xs={6} sx={{transform: "translate(0%, 50%)"}} >
                                        <Grid container>
                                            <Grid item xs={6}>
                                                {wallets.length > 0 ?<Button className="button connect" variant='outlined' color='primary' onClick={openEditProfile}>
                                                    Edit Profile
                                                </Button>: null}  
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button className="button connect" variant='outlined' color='primary' onClick={addWallet}>
                                                    Add Wallet +
                                                </Button>    
                                            </Grid>
                                        </Grid>
                                    </Grid> 
                                : following ? 
                                    <Grid item xs={6} sx={{transform: "translate(0%, 30%)"}} >
                                        <Grid container>
                                            <Grid item xs={6}> 
                                                {wallets.length > 0 ? <Button className="button connect" variant='outlined' color='primary' onClick={openNFTGallery}>
                                                    View Collection
                                                </Button>: null}
                                            </Grid>
                                            <Grid item xs={6}> 
                                                <Button sx={{color: 'white'}} className="button connect" variant='contained' color='primary' onClick={unfollowUser}>
                                                    Following
                                                </Button> 
                                            </Grid>
                                        </Grid> 
                                    </Grid>
                                    : 
                                    <Grid item xs={6} sx={{transform: "translate(0%, 30%)"}} >
                                        <Grid container>
                                            <Grid item xs={4}> 
                                            </Grid>
                                            <Grid item xs={8}> 
                                                <Button className="button connect" variant='outlined' color='primary' onClick={followUser}>
                                                    Follow
                                                </Button> 
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{marginLeft: '2%', transform: "translate(0%, -50%)"}}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="inherit" color={textColor} className="profile-display-name"> 
                                        {profile.displayName}
                                    </Typography> 
                                </Grid>
                                <Grid item xs={12} sx={{display: 'flex', transform: "translate(0%, -25%)",}} >
                                    <Typography variant="inherit" id="at-sign">
                                        @
                                    </Typography>
                                    <Typography variant="inherit" className="user-name">
                                        {profile.username} 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {profile.bio ? <Grid item xs={12}>
                            <CardContent style={{display: "flex", transform: "translate(0%, -25%)", paddingBottom: 0}}>
                                <Typography variant="inherit" color={textColor}>
                                    {profile.bio}
                                </Typography>
                            </CardContent>
                        </Grid> : null}
                        <Grid item xs={12}>
                            <CardContent style={{display: "flex", transform: "translate(0%, -25%)", paddingBottom: 0}}>
                                <Typography className="count-text" color={textColor} sx={{marginRight: '1%'}}>
                                    {followingArray.length}
                                </Typography>
                                <Typography variant='inherit' color={textColor} sx={{marginRight: '1%'}}>
                                    Following
                                </Typography>
                                <Typography className="count-text" color={textColor} sx={{marginRight: '1%', marginLeft: '1%'}}>
                                    {followersArray.length} 
                                </Typography>
                                <Typography variant='inherit' color={textColor} sx={{marginRight: '1%'}}>
                                    Followers
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12}>
                            <CardActions>
                                <Tabs indicatorColor="primary" variant="fullWidth" sx={{width: "100%"}} value={value} onChange={(e, value) => handleChange(e, value)}>
                                    <Tab sx={{color: 'dimgrey' }} className='tab' label={<span style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 'bold' }}>Tweets</span>}  />
                                    <Tab sx={{color: 'dimgrey' }} className='tab' label={<span style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 'bold' }}>Tweets+Replies</span>} />
                                    <Tab sx={{color: 'dimgrey' }} className='tab' label={<span style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 'bold' }}>Media</span>} />
                                    <Tab sx={{color: 'dimgrey' }} className='tab' label={<span style={{ textTransform: 'capitalize', fontSize: '1.1rem', fontWeight: 'bold' }}>Likes</span>} />
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
            : <FacebookCircularProgress />}
            <EditProfile setProfileUser={setProfileUser} setImageUrl={setImageUrl} profile={profile} showNftImages={showNftImages} setShowNFTImages={setShowNftImages} loggedInUser={loggedInUser} NFTArray={NFTArray} open={editOpen} setOpen={setEditOpen} backgroundColor={backgroundColor} textColor={textColor} />
            <NFTGallery setImageUrl={setImageUrl} profile={profile} loggedInUser={loggedInUser} NFTArray={NFTArray} open={open} setOpen={setOpen} backgroundColor={backgroundColor} textColor={textColor} />
        </Grid> 
    )
}

export default Profile
