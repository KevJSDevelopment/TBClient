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
        <Grid container alignItems="center" className={textColor == "black" ? "home-title" : "dark-home-title"}>
            {backButton ? 
                <Grid item xs={1}> 
                    <IconButton color="primary" onClick={() => handleNav()}>
                        <KeyboardBackspaceIcon  />
                    </IconButton> 
                </Grid>
            : null} 
            <Grid item xs={5}>
                <Typography variant="inherit" color={textColor} className="home-text">
                    {text}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <IconButton className="star-icon" >
                    <AutoAwesomeOutlinedIcon color={textColor} fontSize="medium" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Header
