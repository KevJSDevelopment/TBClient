import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import logo from '../images/Twitter-login-photo.PNG'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button, TextField } from '@mui/material'
import SignUpModal from './SignUpModal'
const Login = ({ setUser }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const loginUser = async () => {

        const username = document.getElementById("username-field").value
        const password = document.getElementById("password-field").value

        const meta = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username: username, password: password})
        }


        const res = await fetch("https://localhost:5001/login", meta);
        const data = await res.json();

        if(data.username){
            sessionStorage.setItem("user", JSON.stringify(data))
            setUser(data);
        }
        else {
            if(data.errors){
                let response = ""
                for (const key in data.errors) {
                    response += data.errors[key]
                }
                alert(response)
            }
            else{
                alert(data.error)
            }
        }
    }


    return (
        <Grid container spacing={0} className="login-page">
            <Grid item xs={7}>
                <img src={logo} className="logo" />
            </Grid>
            <Grid item xs={5}>
                <Grid container spacing={2} className="login-info-container">
                    <Grid item xs={12} className="login-info">
                        <Grid container spacing={4} color="white">
                            <Grid item xs={12} className="login-icon">
                                <TwitterIcon style={{fontSize: "3.5rem"}}  />
                            </Grid>
                            <Grid item xs={12} className="login-header">
                                Happening now
                            </Grid>
                            <Grid item xs={12} className="login-subheader">
                                Join twitter-battles today.
                            </Grid>
                            <Grid item xs={12}>
                                <TextField InputLabelProps={{style: { color: '#fff' }}} className="login-field" label="Username" id="username-field" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField InputLabelProps={{style: { color: '#fff' }}} type="password" className="login-field" label="Password" id="password-field"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="button login" variant="contained" color="primary" onClick={loginUser}>
                                    Login
                                </Button> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="button sign-up" variant="contained" color="secondary" onClick={handleOpen}>
                                    Sign up
                                </Button> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <SignUpModal setUser={setUser} setOpen={setOpen} open={open}/>
        </Grid>
    )
}

export default Login
