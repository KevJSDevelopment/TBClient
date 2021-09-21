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

const Nav = ({ background, setBackground }) => {

    const [textColor, setTextColor] = useState("#000000")

    useEffect(() => { 
        if(!background) setTextColor("#000000")
        else setTextColor("secondary")
    }, [background])
    return (
        <Grid item xs={5}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <IconButton color="primary" className="iconborder">
                        <TwitterIcon fontSize="large" color={!background ? "primary" : "secondary"} />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <HomeIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text" >
                            Home
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <Typography variant="inherit" color={textColor} className="button-text">
                            #
                        </Typography>
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Explore
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <NotificationsNoneIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Notifications
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <MailOutlineIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Messages
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <BookmarkBorderIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Bookmarks
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <LibraryBooksOutlinedIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Lists
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <PersonOutlineOutlinedIcon color={!background ? "black" : "secondary"} fontSize="large" className="button-text" />
                        <Typography variant="inherit" color={textColor} className="button-text">
                            Profile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                        <Button className="button"  onClick={() => setBackground(changeBackground(background))}>
                            <Typography variant="inherit" color={textColor} className="button-text">
                                ...
                            </Typography>
                            <Typography variant="inherit" color={textColor} className="button-text">
                                More
                            </Typography>
                        </Button>
                </Grid>
                <Grid item xs={12}>
                        <Button className="button tweet" variant="contained" color="primary">
                            Tweet
                        </Button> 
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Nav
