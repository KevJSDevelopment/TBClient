import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography } from '@material-ui/core'
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

const Nav = ({ background, setBackground }) => {

    return (
        <Grid item xs={4}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="iconborder">
                        <TwitterIcon  />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <HomeIcon /> 
                        <Typography >
                            Home
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography >
                            #
                        </Typography>
                        <Typography >
                            Explore
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <NotificationsNoneIcon/>
                        <Typography>
                            Notifications
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography>
                            Messages
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography>
                            Bookmarks
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography>
                            Lists
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography>
                            Profile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography>
                            ... More
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className="button" color="primary" size="large" onClick={() => setBackground(changeBackground(background))}>
                        <Typography >
                            Tweet
                        </Typography> 
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Nav
