import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid'
import { Button, IconButton, ListItemIcon, Menu, MenuItem, Switch, Typography } from '@mui/material'
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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import Logout from '@mui/icons-material/Logout';

const Nav = ({ background, textColor, setBackground, backgroundColor, loggedInUser, setUser }) => {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavHome = () => {
        navigate('/')
    }

    const handleNavProfile = () => {
        navigate(`/Profile/${loggedInUser.username}`)
    }

    const handleNavBookmarks = () => {
        navigate('/Bookmarks')
    }

    const handleLogout = () => {
        sessionStorage.removeItem('User')
        setUser(null)
    }

    return (
        <Grid item xs={5} >
            <Grid container spacing={2} className="nav-content">
                <Grid item xs={12}>
                    <IconButton color={background ? 'secondary' :  'primary'} className="iconborder" onClick={() => handleNavHome()}>
                        <TwitterIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{color: textColor}} className="button" onClick={() => handleNavHome()}>
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
                    <Button sx={{color: textColor}} className="button" onClick={() => handleNavBookmarks()}>
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
                        <Typography sx={{color: textColor}} variant="inherit" className="button-text" onClick={() => handleNavProfile()}>
                            Profile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                        <Button sx={{color: textColor}} className="button"  onClick={handleClick}>
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{style: {backgroundColor: backgroundColor}}}
            >
                <MenuItem onClick={() => setBackground(changeBackground(background))}>{backgroundColor === 'white' ? <WbSunnyIcon sx={{color: textColor}}/> : <WbSunnyOutlinedIcon sx={{color: textColor}}/>} <Switch />{backgroundColor !== 'white' ? <ModeNightIcon sx={{color: textColor}}/> : <ModeNightOutlinedIcon sx={{color: textColor}}/>}</MenuItem>
                <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon >
                        <Logout color={backgroundColor === 'white' ? 'action' : 'secondary'} fontSize="small" />
                    </ListItemIcon>
                    <Typography color={textColor}>
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default Nav
