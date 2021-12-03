import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, IconButton, Typography } from '@mui/material'
import { changeBackground } from '../helpers/StyleOptions'
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const Nav = ({ background, textColor, setBackground, backgroundColor }) => {


    return (
        <Grid item xs={5} >
            <Grid container spacing={2} className="nav-content">
                <Grid item xs={12}>
                    <IconButton color={background ? 'secondary' :  'primary'} className="iconborder">
                        <TwitterIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <HomeIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text" >
                            Home
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            #
                        </Typography>
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Explore
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <NotificationsNoneIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Notifications
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <MailOutlineIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Messages
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <BookmarkBorderIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Bookmarks
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <LibraryBooksOutlinedIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Lists
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button">
                        <PersonOutlineOutlinedIcon fontSize="large" className="button-text" />
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                            Profile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                        <Button sx={{color: textColor}} className="button"  onClick={() => setBackground(changeBackground(background))}>
                            <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                                ...
                            </Typography>
                            <Typography sx={{color: textColor}} variant="inherit" className="button-text">
                                More
                            </Typography>
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button tweet" variant="contained" color="primary">
                        Tweet
                    </Button> 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Nav
