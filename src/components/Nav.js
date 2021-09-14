import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, button } from '@material-ui/core'
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
        <Grid item xs={4}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="iconborder" onClick={() => setBackground(changeBackground(background))}>
                        {/* <TwitterIcon  /> */}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <HomeIcon />  */}
                        <button >
                            Home
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <button style={{margin: "5%"}} >
                            #
                        </button> */}
                        <button >
                            Explore
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <NotificationsNoneIcon/> */}
                        <button>
                            Notifications
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <MailOutlineIcon/> */}
                        <button>
                            Messages
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <BookmarkBorderIcon /> */}
                        <button>
                            Bookmarks
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <LibraryBooksOutlinedIcon /> */}
                        <button>
                            Lists
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        {/* <PersonOutlineOutlinedIcon /> */}
                        <button>
                            Profile
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        <button>
                            ... More
                        </button>
                    {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                    {/* <Button className="button tweet" size="large" onClick={() => setBackground(changeBackground(background))}> */}
                        <button >
                            Tweet
                        </button> 
                    {/* </Button> */}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Nav
