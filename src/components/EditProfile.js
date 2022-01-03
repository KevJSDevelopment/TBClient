import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Card, CardMedia, Grid, IconButton, Modal, Switch, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import defaultBackground from '../images/Default-background.png'
import NFTGallery from './NFTGallery';
import { useState } from 'react';
import { useEffect } from 'react';
import { Translate } from '@mui/icons-material';

const EditProfile = ({ NFTArray, open, setOpen, profile, loggedInUser, backgroundColor, textColor, setImageUrl, showNftImages, setShowNFTImages, setProfileUser }) => {

    const [galleryOpen, setGalleryOpen] = useState(false)
    const [usernameText, setUsernameText] = useState(profile.username)
    const [displayNameText, setDisplayNameText] = useState(profile.displayName)
    const [bioText, setBioText] = useState(profile.bio)

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleClose = () => setOpen(false);

    const handleSetChanges = async () => {
        const username = document.getElementById('edit-username-field').value
        const displayname = document.getElementById('edit-displayname-field').value
        const bio = document.getElementById('edit-bio-field').value
        

        if(selectedIndex >= 0){
            const url = setImageUrl(NFTArray[selectedIndex])

            const meta = {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify([{
                    "op": "replace",
                    "path": "/usingNFT",
                    "value": true
                },
                {
                    "op": "replace",
                    "path": "/nftProfileImage",
                    "value": url
                },
                {
                    "op": "replace",
                    "path": "/username",
                    "value": username
                },
                {
                    "op": "replace",
                    "path": "/displayName",
                    "value": displayname
                },
                {
                    "op": "replace",
                    "path": "/bio",
                    "value": bio
                }
            ])
            }

            await fetch(`https://localhost:5001/poketwitter/update/${profile.username}`, meta)
        } else {
            const meta = {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify([{
                    "op": "replace",
                    "path": "/usingNFT",
                    "value": false
                }, 
                {
                    "op": "replace",
                    "path": "/username",
                    "value": username
                },
                {
                    "op": "replace",
                    "path": "/displayName",
                    "value": displayname
                },
                {
                    "op": "replace",
                    "path": "/bio",
                    "value": bio
                }
            ])
            }

            await fetch(`https://localhost:5001/poketwitter/update/${profile.username}`, meta)
        }

    }

    useEffect(() => {
        
    }, [selectedIndex])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Card className="edit-modal-card" style={{ backgroundColor: backgroundColor }}>
                <Grid container spacing={0} color="white">
                    <Grid item xs={12}>
                        <IconButton sx={{borderRadius: '0', padding: '0', paddingBottom:'2%', margin: '0', width: '100%'}}>
                            <CardMedia
                                sx={{maxHeight: "200px"}}
                                component="img"
                                alt="Background"
                                src={profile.backgroundImage ? `data:image/jpg;base64, ${profile.backgroundImage}` : defaultBackground }
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} >
                            <Grid container textAlign='center'>
                                {!showNftImages ?
                                    <Grid item xs={12}>
                                        <IconButton color='primary' onClick={() => setGalleryOpen(true)}>
                                            <img className="edit-profile-image" src={`data:image/jpg;base64, ${profile.imageFiles}`} />
                                        </IconButton>
                                        <IconButton color='primary' sx={{zIndex: 1, transform: 'translate(-265%)'}}>
                                            <EditIcon  />
                                        </IconButton>
                                    </Grid> 
                                    :
                                    <Grid item xs={12} onClick={() => setGalleryOpen(true)}>
                                        <img className="edit-profile-image" src={setImageUrl(NFTArray[selectedIndex])} />
                                    </Grid>
                                }
                            </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant='outlined' size='small'InputLabelProps={{sx: { color: textColor, borderColor: textColor }}} InputProps={{sx: { color: textColor }}}  className="signup-field" label="Username" id="edit-username-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant='outlined' size='small' InputLabelProps={{sx: { color: textColor, borderColor: textColor }}} InputProps={{sx: { color: textColor }}} className="signup-field" label="Displayname" id="edit-displayname-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant='outlined' style={{ borderColor: textColor }} InputLabelProps={{sx: { color: textColor, borderColor: textColor }}} className="signup-field" label="Bio" id="edit-bio-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSetChanges} sx={textColor === 'black' ? { color: 'primary' } : { color: 'white'}} className="button save-changes" variant={textColor === 'black' ? "outlined": 'contained'} color='primary'>
                            Save Changes
                        </Button> 
                    </Grid>
                    <NFTGallery setImageUrl={setImageUrl} setShowNFTImages={setShowNFTImages} profile={profile} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} loggedInUser={loggedInUser} NFTArray={NFTArray} open={galleryOpen} setOpen={setGalleryOpen} backgroundColor={backgroundColor} textColor={textColor} />
                </Grid>
            </Card>
        </Modal>
    )
}

export default EditProfile
