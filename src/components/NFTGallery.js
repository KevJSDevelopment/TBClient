import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Link, Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';
import SelectableGalleryItem from './GalleryComponents/SelectableGalleryItem';
import ViewGalleryItem from './GalleryComponents/ViewGalleryItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const NFTGallery = ({ NFTArray, open, setOpen, profile, loggedInUser, backgroundColor, textColor, setImageUrl, selectedIndex, setSelectedIndex, setShowNFTImages }) => {

    const handleClose = () => setOpen(false);

    const Input = styled('input')({
        display: 'none',
    });

    const handleIndexChange = () => {
        if(selectedIndex > -1) setShowNFTImages(true)
        else setShowNFTImages(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            >
            <div>
                <Card className="gallery-card" sx={{backgroundColor: backgroundColor}}>
                    <Paper style={{display: 'flex', marginBottom: '2%', padding: '1%', borderRadius: '0 0 0 0', justifyContent: 'center', backgroundColor: backgroundColor }} elevation={2}>
                        <Grid container>
                            <Grid item xs={4}>
                                {profile.username === loggedInUser.username ? <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" className="button" color={textColor === 'black' ? 'primary' : 'secondary'} component="span">
                                        Upload Profile Picture
                                        <PersonIcon />
                                    </Button>
                                </label>: null}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color='primary' className='gallery-header'>
                                    {profile.username === loggedInUser.username ? 'My NFT Gallery' : `${profile.displayName}'s NFT Gallery`}
                                </Typography>
                            </Grid>
                            {profile.username === loggedInUser.username ? <Grid item xs={4}>
                                <Button variant='contained' color='primary' className='button select-button' onClick={handleIndexChange}> Save NFT as profile </Button>
                            </Grid>: null}
                        </Grid>        
                    </Paper>
                    <Grid justifyContent='center' textAlign='center' container className='gallery-container'>
                        <Grid textAlign='center' item xs={3} className={selectedIndex === -1 ? 'selected-gallery-item' : 'gallery-item'}>
                            <Card sx={{ width: '90%', height: 325, margin: '5%', backgroundColor: backgroundColor, color: textColor}} onClick={() => setSelectedIndex(-1)} >
                                <CardActionArea sx={{ width: '100%', height: 350}}>
                                    {profile.username === loggedInUser.username ? selectedIndex === -1 ? 
                                        <IconButton color='primary' >
                                            <CheckCircleIcon /> 
                                        </IconButton>
                                        : 
                                        <IconButton color='primary' >
                                            <CheckCircleOutlineOutlinedIcon /> 
                                        </IconButton> : null
                                    }
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={`data:image/jpg;base64, ${profile.imageFiles}`}
                                    />
                                    <CardContent>
                                        <Typography color={textColor === 'black' ? 'black' : 'white'} >
                                            Default Photo
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {NFTArray.map((nft, index) => {
                            return (profile.username === loggedInUser.username ? <SelectableGalleryItem textColor={textColor} nft={nft} backgroundColor={backgroundColor} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} index={index} setImageUrl={setImageUrl} key={`${nft}-${index}`} /> : <ViewGalleryItem textColor={textColor} backgroundColor={backgroundColor} nft={nft} index={index} setImageUrl={setImageUrl} key={`${nft}-${index}`} />)
                        })}    
                    </Grid>
                </Card>
            </div>
        </Modal>
    )
}

export default NFTGallery
