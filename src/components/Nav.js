import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, IconButton, Typography } from '@material-ui/core'
import { changeBackground } from '../helpers/StyleOptions'
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EmailIcon from '@material-ui/icons/Email';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

const Nav = ({ background, setBackground }) => {

    return (
        <Grid item xs={5}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <IconButton color="primary" className="iconborder">
                        <TwitterIcon fontSize="large" color="primary" />
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button home">
                        <HomeIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text" >
                            Home
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <Typography variant="inherit" alignLeft className="button-text">
                            #
                        </Typography>
                        <Typography variant="inherit" className="button-text">
                            Explore
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <NotificationsNoneIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text">
                            Notifications
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <MailOutlineIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text">
                            Messages
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <BookmarkBorderIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text">
                            Bookmarks
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <LibraryBooksOutlinedIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text">
                            Lists
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button">
                        <PersonOutlineOutlinedIcon fontSize="large" className="button-text" />
                        <Typography variant="inherit" className="button-text">
                            Profile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                        <Button className="button"  onClick={() => setBackground(changeBackground(background))}>
                            <Typography variant="inherit" alignLeft className="button-text">
                                ...
                            </Typography>
                            <Typography variant="inherit" className="button-text">
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
