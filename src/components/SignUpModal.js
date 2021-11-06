import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Card, Grid, Modal, TextField } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/system';

const SignUpModal = ({ open, setOpen, setUser}) => {

    const Input = styled('input')({
        display: 'none',
    });

    const handleClose = () => setOpen(false);

    const signUp = async () => {

        const formData = new FormData();
        const username = document.getElementById("signup-username-field").value;
        const displayName = document.getElementById("signup-displayname-field").value;
        const password = document.getElementById("signup-password-field").value;
        const files = document.getElementById("contained-button-file").files[0];

        formData.append("username", username);
        formData.append("password", password);
        formData.append("displayname", displayName);
        formData.append("files", files);

        const meta = {
            method: "POST",
            body: formData
        };

        const res = await fetch("https://localhost:5001/poketwitter", meta);
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
        <Modal
            open={open}
            onClose={handleClose}
            >
            <Card className="modal-card">
                <Grid container spacing={4} color="white">
                    <Grid item xs={12}>
                        <TwitterIcon style={{fontSize: "3.5rem"}} className="signup-icon" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{style: { color: '#fff' }}} className="signup-field" label="Username" id="signup-username-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{style: { color: '#fff' }}} className="signup-field" label="Displayname" id="signup-displayname-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField InputLabelProps={{style: { color: '#fff' }}} className="signup-field" label="Password" id="signup-password-field"/>
                    </Grid>
                    <Grid item xs={12} className="upload">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" className="button upload" component="span">
                                Upload Profile Picture
                                <PersonIcon />
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <Button className="button sign-up" variant="contained" color="secondary" onClick={signUp}>
                            Sign up
                        </Button> 
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    )
}

export default SignUpModal
