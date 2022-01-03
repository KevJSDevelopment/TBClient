import React from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useNavigate } from 'react-router';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = ({ text, textColor, backButton }) => {

    const navigate = useNavigate();

    const handleNav = () => {
        navigate(-1)
    }

    return (
        <Grid container alignItems="center" className={textColor==="black" ? "home-title" : "dark-home-title"}>
            {backButton ? 
                <Grid item xs={6} className='header-content'>
                    <Grid container>
                        <Grid item xs={2}> 
                            <IconButton color="primary" onClick={() => handleNav()}>
                                <KeyboardBackspaceIcon  />
                            </IconButton> 
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="inherit" color={textColor} className="home-text">
                                {text}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            : 
            <Grid item xs={6} className='header-content'>
                <Typography variant="inherit" color={textColor} className="home-text">
                    {text}
                </Typography>
            </Grid>} 
            <Grid item xs={6} className='header-content'>
                <IconButton className="star-icon" color={textColor==="black" ?'primary' : 'secondary'}>
                    <AutoAwesomeOutlinedIcon  />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Header
