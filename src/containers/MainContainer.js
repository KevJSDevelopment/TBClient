import React from 'react'
import Grid from '@mui/material/Grid'
import Nav from "../components/Nav"
import Home from "../components/Home"
import Discover from "../components/Discover"

const MainContainer = ({ textColor, background, setBackground, backgroundColor, user}) => {
    return (
        <Grid container spacing={1}>
          <Grid item className="Nav" xs={4}>
            <Grid container>
              <Grid item xs={7} />
              <Nav background={background} textColor={textColor} setBackground={setBackground} />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Home user={user} textColor={textColor} backgroundColor={backgroundColor} />
            </Grid>
          </Grid>
          <Grid item className="Discover" xs={4}>
            <Grid container>
              <Discover textColor={textColor} />
            </Grid>
          </Grid>
      </Grid>
    )
}

export default MainContainer
