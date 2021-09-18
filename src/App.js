import React, { useEffect, useState } from "react"
import Grid from '@material-ui/core/Grid'
import Nav from "./components/Nav"
import Home from "./components/Home"
import Discover from "./components/Discover"
import './styles/app.css';


const App = () => {
  
  const [background, setBackground] = useState(false)

  // const meta = {
  //   method: "POST",
  //   headers: {"Content-Type": "application/json"},
  //   body: JSON.stringify({ username: `${name}-${count}`, displayname: `test-${count}`, password: `test-${count}`, imageurl: `test-${count}`})
  // }
  
  useEffect(() => {
    const body = document.body
    if(!background){
      body.style.backgroundColor = "white"
    }
    else body.style.backgroundColor = "#141d26"
  }, [background])

  return (
    <div className="App">
      <Grid container spacing={1}>
          <Grid item className="Nav" xs={4}>
            <Grid container>
              <Grid item xs={7} />
              <Nav background={background} setBackground={setBackground} />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Home />
            </Grid>
          </Grid>
          <Grid item className="Discover" xs={4}>
            <Grid container>
              <Discover />
            </Grid>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
